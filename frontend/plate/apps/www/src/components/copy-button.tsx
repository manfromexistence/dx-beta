'use client';

import * as React from 'react';
import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';
import { cn } from '@udecode/cn';

import { NpmCommands } from '@/types/unist';
import { Event, trackEvent } from '@/lib/events';
import { Button } from '@/registry/default/plate-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/default/plate-ui/dropdown-menu';

import { Icons } from './icons';

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
  event?: Event['name'];
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
}

export function CopyButton({
  value,
  className,
  src,
  event,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        'relative z-10 size-6 text-slate-50 hover:bg-slate-700 hover:text-slate-50',
        className
      )}
      onClick={() => {
        copyToClipboardWithMeta(
          value,
          event
            ? {
                name: event,
                properties: {
                  code: value,
                },
              }
            : undefined
        );
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Icons.check className="size-3" />
      ) : (
        <Icons.copy className="size-3" />
      )}
    </Button>
  );
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
  value: string;
  classNames: string;
  className?: string;
}

export function CopyWithClassNames({
  value,
  classNames,
  className,
}: CopyWithClassNamesProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const copyToClipboard = React.useCallback((_value: string) => {
    copyToClipboardWithMeta(_value);
    setHasCopied(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'relative z-10 size-6 text-slate-50 hover:bg-slate-700 hover:text-slate-50',
            className
          )}
        >
          {hasCopied ? (
            <Icons.check className="size-3" />
          ) : (
            <Icons.copy className="size-3" />
          )}
          <span className="sr-only">Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copyToClipboard(value)}>
          <Icons.react className="mr-2 size-4" />
          <span>Component</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>
          <Icons.tailwind className="mr-2 size-4" />
          <span>Classname</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
  commands: Required<NpmCommands>;
}

export function CopyNpmCommandButton({
  commands,
  className,
}: CopyNpmCommandButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const copyCommand = React.useCallback(
    (value: string, pm: 'npm' | 'pnpm' | 'yarn' | 'bun') => {
      void copyToClipboardWithMeta(value, {
        name: 'copy_npm_command',
        properties: {
          command: value,
          pm,
        },
      });
      setHasCopied(true);
    },
    []
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'relative z-10 size-6 text-slate-50 hover:bg-slate-700 hover:text-slate-50',
            className
          )}
        >
          {hasCopied ? (
            <Icons.check className="size-3" />
          ) : (
            <Icons.copy className="size-3" />
          )}
          <span className="sr-only">Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => copyCommand(commands.__npmCommand__, 'npm')}
        >
          npm
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => copyCommand(commands.__yarnCommand__, 'yarn')}
        >
          yarn
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => copyCommand(commands.__pnpmCommand__, 'pnpm')}
        >
          pnpm
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => copyCommand(commands.__bunCommand__, 'bun')}
        >
          bun
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
