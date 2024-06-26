"use client"

import * as React from "react"
import {
  CheckIcon,
  CopyIcon,
  InfoCircledIcon,
  MoonIcon,
  ResetIcon,
  SunIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons"
import template from "lodash.template"
import { Monitor, Paintbrush } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { copyToClipboardWithMeta } from "@/components/copy-button"
import { ThemeWrapper } from "@/components/theme-wrapper"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/registry/new-york/ui/drawer"
import { Label } from "@/registry/new-york/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { Skeleton } from "@/registry/new-york/ui/skeleton"
import { Theme, themes } from "@/registry/themes"

import "@/styles/mdx.css"

import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip"

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig()
  const { resolvedTheme: mode } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Paintbrush className="mr-2 size-4" />
            Customize Theme
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-6 pt-0">
          <Customizer />
        </DrawerContent>
      </Drawer>
      <div className="flex flex-col space-y-3">
        <div className="mr-2 hidden items-center space-x-0.5 lg:flex">
          {mounted ? (
            <>
              {["zinc", "rose", "blue", "green", "orange"].map((color) => {
                const theme = themes.find((theme) => theme.name === color)
                const isActive = config.theme === color

                if (!theme) {
                  return null
                }

                return (
                  <Tooltip key={theme.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          setConfig({
                            ...config,
                            theme: theme.name,
                          })
                        }
                        className={cn(
                          "flex size-9 items-center justify-center rounded-full border-2 text-xs",
                          isActive
                            ? "border-[--theme-primary]"
                            : "border-transparent"
                        )}
                        style={
                          {
                            "--theme-primary": `hsl(${
                              theme?.activeColor[
                                mode === "dark" ? "dark" : "light"
                              ]
                            })`,
                          } as React.CSSProperties
                        }
                      >
                        <span
                          className={cn(
                            "flex size-6 items-center justify-center rounded-full bg-[--theme-primary]"
                          )}
                        >
                          {isActive && (
                            <CheckIcon className="size-4 text-white" />
                          )}
                        </span>
                        <span className="sr-only">{theme.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="rounded-lg bg-zinc-900 text-zinc-50"
                    >
                      {theme.label}
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </>
          ) : (
            <div className="mr-1 flex items-center gap-4">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-6 rounded-full" />
            </div>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Paintbrush className="mr-2 size-4" />
              Customize Theme
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            className="z-40 w-[340px] rounded-lg bg-white p-6 dark:bg-zinc-950"
          >
            <Customizer />
          </PopoverContent>
        </Popover>
      </div>
      {/* <CopyCodeButton /> */}
    </div>
  )
}

function Customizer() {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme: setMode, resolvedTheme: mode } = useTheme()
  const [config, setConfig] = useConfig()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeWrapper
      defaultTheme="zinc"
      className="flex flex-col space-y-4 md:space-y-6"
    >
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Customize
          </div>
          <div className="text-xs text-muted-foreground">
            Pick a style and color for your components.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-lg"
          onClick={() => {
            setConfig({
              ...config,
              theme: "zinc",
              radius: 0.5,
            })
          }}
        >
          <ResetIcon />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <div className="flex w-full items-center">
            <Label className="text-xs">Style</Label>
            <Popover>
              <PopoverTrigger>
                <InfoCircledIcon className="ml-1 size-3" />
                <span className="sr-only">About styles</span>
              </PopoverTrigger>
              <PopoverContent
                className="space-y-3 rounded-lg text-sm"
                side="right"
                align="start"
                alignOffset={-20}
              >
                <p className="font-medium">
                  What is the difference between the New York and Default style?
                </p>
                <p>
                  A style comes with its own set of components, animations,
                  icons and more.
                </p>
                <p>
                  The <span className="font-medium">Default</span> style has
                  larger inputs, uses lucide-react for icons and
                  tailwindcss-animate for animations.
                </p>
                <p>
                  The <span className="font-medium">New York</span> style ships
                  with smaller buttons and cards with shadows. It uses icons
                  from Radix Icons.
                </p>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setConfig({ ...config, style: "default" })}
              className={cn(
                config.style === "default" && "border-2 border-primary"
              )}
            >
              Default
            </Button>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setConfig({ ...config, style: "new-york" })}
              className={cn(
                config.style === "new-york" && "border-2 border-primary"
              )}
            >
              New York
            </Button>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => {
              const isActive = config.theme === theme.name

              return mounted ? (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    setConfig({
                      ...config,
                      theme: theme.name,
                    })
                  }}
                  className={cn(
                    "justify-start",
                    isActive && "border-2 border-primary"
                  )}
                  style={
                    {
                      "--theme-primary": `hsl(${
                        theme?.activeColor[mode === "dark" ? "dark" : "light"]
                      })`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "mr-1 flex size-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"
                    )}
                  >
                    {isActive && <CheckIcon className="size-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={theme.name} />
              )
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Radius</Label>
          <div className="grid grid-cols-5 gap-2">
            {["0", "0.3", "0.5", "0.75", "1.0"].map((value) => {
              return (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={value}
                  onClick={() => {
                    setConfig({
                      ...config,
                      radius: parseFloat(value),
                    })
                  }}
                  className={cn(
                    config.radius === parseFloat(value) &&
                      "border-2 border-primary"
                  )}
                >
                  {value}
                </Button>
              )
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setMode("light")}
                  className={cn(mode === "light" && "border-2 border-primary")}
                >
                  <SunIcon className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setMode("dark")}
                  className={cn(mode === "dark" && "border-2 border-primary")}
                >
                  <MoonIcon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </ThemeWrapper>
  )
}

function CopyCodeButton() {
  const [config] = useConfig()
  const activeTheme = themes.find((theme) => theme.name === config.theme)
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <>
      {activeTheme && (
        <Button
          onClick={() => {
            copyToClipboardWithMeta(getThemeCode(activeTheme, config.radius), {
              name: "copy_theme_code",
              properties: {
                theme: activeTheme.name,
                radius: config.radius,
              },
            })
            setHasCopied(true)
          }}
          className="md:hidden"
        >
          {hasCopied ? (
            <CheckIcon className="mr-2 size-4" />
          ) : (
            <CopyIcon className="mr-2 size-4" />
          )}
          Copy
        </Button>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden md:flex">Copy code</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl outline-none">
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>
          <ThemeWrapper defaultTheme="zinc" className="relative">
            <CustomizerCode />
            {activeTheme && (
              <Button
                size="sm"
                onClick={() => {
                  copyToClipboardWithMeta(
                    getThemeCode(activeTheme, config.radius),
                    {
                      name: "copy_theme_code",
                      properties: {
                        theme: activeTheme.name,
                        radius: config.radius,
                      },
                    }
                  )
                  setHasCopied(true)
                }}
                className="absolute right-4 top-4 bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground"
              >
                {hasCopied ? (
                  <CheckIcon className="mr-2 size-4" />
                ) : (
                  <CopyIcon className="mr-2 size-4" />
                )}
                Copy
              </Button>
            )}
          </ThemeWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

function CustomizerCode() {
  const [config] = useConfig()
  const activeTheme = themes.find((theme) => theme.name === config.theme)

  return (
    <ThemeWrapper defaultTheme="zinc" className="relative space-y-4">
      <div data-rehype-pretty-code-fragment="">
        <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            <span className="line text-white">@layer base &#123;</span>
            <span className="line text-white">&nbsp;&nbsp;:root &#123;</span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {activeTheme?.cssVars.light["background"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
              {activeTheme?.cssVars.light["foreground"]};
            </span>
            {[
              "card",
              "popover",
              "primary",
              "secondary",
              "muted",
              "accent",
              "destructive",
            ].map((prefix) => (
              <>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                  {
                    activeTheme?.cssVars.light[
                      prefix as keyof typeof activeTheme.cssVars.light
                    ]
                  }
                  ;
                </span>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {
                    activeTheme?.cssVars.light[
                      `${prefix}-foreground` as keyof typeof activeTheme.cssVars.light
                    ]
                  }
                  ;
                </span>
              </>
            ))}
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
              {activeTheme?.cssVars.light["border"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
              {activeTheme?.cssVars.light["input"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
              {activeTheme?.cssVars.light["ring"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--radius: {config.radius}rem;
            </span>
            <span className="line text-white">&nbsp;&nbsp;&#125;</span>
            <span className="line text-white">&nbsp;</span>
            <span className="line text-white">&nbsp;&nbsp;.dark &#123;</span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {activeTheme?.cssVars.dark["background"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
              {activeTheme?.cssVars.dark["foreground"]};
            </span>
            {[
              "card",
              "popover",
              "primary",
              "secondary",
              "muted",
              "accent",
              "destructive",
            ].map((prefix) => (
              <>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                  {
                    activeTheme?.cssVars.dark[
                      prefix as keyof typeof activeTheme.cssVars.dark
                    ]
                  }
                  ;
                </span>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {
                    activeTheme?.cssVars.dark[
                      `${prefix}-foreground` as keyof typeof activeTheme.cssVars.dark
                    ]
                  }
                  ;
                </span>
              </>
            ))}
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
              {activeTheme?.cssVars.dark["border"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
              {activeTheme?.cssVars.dark["input"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
              {activeTheme?.cssVars.dark["ring"]};
            </span>
            <span className="line text-white">&nbsp;&nbsp;&#125;</span>
            <span className="line text-white">&#125;</span>
          </code>
        </pre>
      </div>
    </ThemeWrapper>
  )
}

function getThemeCode(theme: Theme, radius: number) {
  if (!theme) {
    return ""
  }

  return template(BASE_STYLES_WITH_VARIABLES)({
    colors: theme.cssVars,
    radius,
  })
}

const BASE_STYLES_WITH_VARIABLES = `
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: <%- radius %>rem;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
  }
}
`

export function SiteFooter() {
  const { setTheme } = useTheme()
  const pathname = usePathname()

  return (
    // <footer className="py-6 md:px-8 md:py-0">
    //   <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
    //     <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
    //       Built by{" "}
    //       <a
    //         href={siteConfig.links.twitter}
    //         target="_blank"
    //         rel="noreferrer"
    //         className="font-medium underline underline-offset-4"
    //       >
    //         shadcn
    //       </a>
    //       . The source code is available on{" "}
    //       <a
    //         href={siteConfig.links.github}
    //         target="_blank"
    //         rel="noreferrer"
    //         className="font-medium underline underline-offset-4"
    //       >
    //         GitHub
    //       </a>
    //       .
    //     </p>
    //   </div>
    // </footer>
    <footer className="flex min-h-[300px] w-full items-center justify-center border-t py-16">
      <div
        className={cn(
          "w-full px-3 sm:px-6 lg:px-8",
          pathname === "/home" ? "lg:px-[1%]" : "lg:px-[5%]"
        )}
      >
        <div
          className={cn(
            "mx-auto grid grid-cols-1 place-content-center gap-5 md:grid-cols-3 xl:grid-cols-6",
            pathname === "/home" ? "max-w-[1200px]" : "w-full"
          )}
        >
          <div className="space-y-3">
            <a className="font-semidark text-xl" href="#">
              Get all updates.
            </a>
            <div className="mx-auto mt-3 flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Enter you email"
                className="w-full min-w-[185px]"
              />
              <Button variant="default">Suscribe</Button>
            </div>

            <div className="text-start text-[0.8rem]">
              @Nurzhol Tabigat 2024 All rights reserved.
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">About us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Our technologies
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Recommendation
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Report & Vulnerebility
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Term & conditions
                </a>
              </li>
            </ul>
          </div>

          <div
            className={cn(
              "flex w-full flex-col",
              pathname === "/home"
                ? "items-start justify-start "
                : "items-center justify-center"
            )}
          >
            <h3 className="text-lg font-medium">Developer</h3>
            <ul
              className={cn(
                "mt-4 flex w-full flex-col space-y-2",
                pathname === "/home"
                  ? "items-start justify-start "
                  : "items-center justify-center"
              )}
            >
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Api
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Readme
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Wiki
                </a>
              </li>
            </ul>
          </div>

          <div
            className={cn(
              "flex w-full flex-col",
              pathname === "/home"
                ? "items-start justify-start "
                : "items-center justify-center"
            )}
          >
            <h3 className="text-lg font-medium">Company</h3>
            <ul
              className={cn(
                "mt-4 flex w-full flex-col space-y-2",
                pathname === "/home"
                  ? "items-start justify-start "
                  : "items-center justify-center"
              )}
            >
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Customers
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Brand
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Croudfund
                </a>
              </li>
            </ul>
          </div>

          <div
            className={cn(
              "flex w-full flex-col",
              pathname === "/home"
                ? "items-start justify-start "
                : "items-end justify-start"
            )}
          >
            <h3 className="text-lg font-medium">Resource</h3>
            <ul
              className={cn(
                "mt-4 flex w-full flex-col space-y-2",
                pathname === "/home"
                  ? "items-start justify-start "
                  : "items-end justify-start"
              )}
            >
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Dpa
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[hsl(var(--muted-foreground))] underline-offset-4 hover:text-[hsl(var(--primary))] hover:underline"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div
            className={cn(
              "flex w-full flex-col space-y-3",
              pathname === "/home"
                ? "items-start justify-start "
                : "items-end justify-start"
            )}
          >
            <span className="text-md">Preferences</span>
            <div className="flex w-min flex-row items-start justify-start space-x-1 rounded-full border p-1">
              <ToggleGroup type="single">
                <ToggleGroupItem
                  onClick={() => setTheme("dark")}
                  className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                  value="dark"
                  aria-label="Toggle dark"
                >
                  <MoonIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  onClick={() => setTheme("light")}
                  className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                  value="light"
                  aria-label="Toggle light"
                >
                  <SunIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  onClick={() => setTheme("system")}
                  className="rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
                  value="system"
                  aria-label="Toggle system"
                >
                  <Monitor className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            {/* <ThemeCustomizer /> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
