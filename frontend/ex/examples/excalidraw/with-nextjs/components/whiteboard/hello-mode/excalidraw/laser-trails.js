import { AnimatedTrail } from "./animated-trail";
import { easeOut } from "./utils";
import { getClientColor } from "./clients";
import { DEFAULT_LASER_COLOR } from "./constants";
export class LaserTrails {
    animationFrameHandler;
    app;
    localTrail;
    collabTrails = new Map();
    container;
    constructor(animationFrameHandler, app) {
        this.animationFrameHandler = animationFrameHandler;
        this.app = app;
        this.animationFrameHandler.register(this, this.onFrame.bind(this));
        this.localTrail = new AnimatedTrail(animationFrameHandler, app, {
            ...this.getTrailOptions(),
            fill: () => DEFAULT_LASER_COLOR,
        });
    }
    getTrailOptions() {
        return {
            simplify: 0,
            streamline: 0.4,
            sizeMapping: (c) => {
                const DECAY_TIME = 1000;
                const DECAY_LENGTH = 50;
                const t = Math.max(0, 1 - (performance.now() - c.pressure) / DECAY_TIME);
                const l = (DECAY_LENGTH -
                    Math.min(DECAY_LENGTH, c.totalLength - c.currentIndex)) /
                    DECAY_LENGTH;
                return Math.min(easeOut(l), easeOut(t));
            },
        };
    }
    startPath(x, y) {
        this.localTrail.startPath(x, y);
    }
    addPointToPath(x, y) {
        this.localTrail.addPointToPath(x, y);
    }
    endPath() {
        this.localTrail.endPath();
    }
    start(container) {
        this.container = container;
        this.animationFrameHandler.start(this);
        this.localTrail.start(container);
    }
    stop() {
        this.animationFrameHandler.stop(this);
        this.localTrail.stop();
    }
    onFrame() {
        this.updateCollabTrails();
    }
    updateCollabTrails() {
        if (!this.container || this.app.state.collaborators.size === 0) {
            return;
        }
        for (const [key, collaborator] of this.app.state.collaborators.entries()) {
            let trail;
            if (!this.collabTrails.has(key)) {
                trail = new AnimatedTrail(this.animationFrameHandler, this.app, {
                    ...this.getTrailOptions(),
                    fill: () => collaborator.pointer?.laserColor ||
                        getClientColor(key, collaborator),
                });
                trail.start(this.container);
                this.collabTrails.set(key, trail);
            }
            else {
                trail = this.collabTrails.get(key);
            }
            if (collaborator.pointer && collaborator.pointer.tool === "laser") {
                if (collaborator.button === "down" && !trail.hasCurrentTrail) {
                    trail.startPath(collaborator.pointer.x, collaborator.pointer.y);
                }
                if (collaborator.button === "down" &&
                    trail.hasCurrentTrail &&
                    !trail.hasLastPoint(collaborator.pointer.x, collaborator.pointer.y)) {
                    trail.addPointToPath(collaborator.pointer.x, collaborator.pointer.y);
                }
                if (collaborator.button === "up" && trail.hasCurrentTrail) {
                    trail.addPointToPath(collaborator.pointer.x, collaborator.pointer.y);
                    trail.endPath();
                }
            }
        }
        for (const key of this.collabTrails.keys()) {
            if (!this.app.state.collaborators.has(key)) {
                const trail = this.collabTrails.get(key);
                trail.stop();
                this.collabTrails.delete(key);
            }
        }
    }
}
