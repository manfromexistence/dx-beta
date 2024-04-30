"use client"

import { useCallback } from "react"
import * as React from "react"
import type { NextPage } from "next"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ViewVerticalIcon } from "@radix-ui/react-icons"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { Button } from "@/registry/new-york/ui/button"
import { ScrollArea } from "@/registry/new-york/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/registry/new-york/ui/sheet"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const Header: NextPage = () => {
  const onButtonsContainerClick = useCallback(() => {
    // Please sync "Log In - Welcome" to the project
  }, [])
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <section className=" !sticky !top-0 z-50 w-full !border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header className="box-border flex h-[88px] max-w-full flex-1 flex-col items-start gap-[20px] px-0 py-5 text-left font-headings-desktop-poppins-16px-regular text-8xl text-blueviolet-200 lg:justify-start">
        <div className="hidden h-12 w-[158px]" />
        <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch px-20 py-0 mq750:box-border mq750:px-10">
          <div className="flex max-w-full flex-1 flex-row items-start justify-start gap-[24px]">
            <div className="box-border flex w-[143px] flex-col items-start justify-start">
              <Link href="/">
                <h2 className="flex flex-row items-center justify-center">
                  <img className="size-[20px]" alt="logo" src="/logo.png" />
                  <span className="text-shade-white">STUDY</span>
                </h2>
              </Link>
            </div>
            <div className="flex flex-1 flex-col items-start justify-start px-0 pb-0 pt-1 lg:hidden">
              <div className="relative h-10 w-px bg-neutrals-3" />
            </div>
            <nav className="m-0 box-border hidden max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-[13.5px] lg:flex">
              <nav className="m-0 flex w-[468.9px] max-w-full flex-row items-start justify-between gap-[20px] text-left font-dm-sans text-base text-lightsteelblue-200">
                <Link
                  href="/about"
                  className={cn(
                    "relative inline-block min-w-[46.9px] shrink-0 transition-colors hover:text-foreground/80",
                    pathname === "/about"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  About
                </Link>
                <Link
                  href="/calculator"
                  className={cn(
                    "relative inline-block min-w-[76px] shrink-0 transition-colors hover:text-foreground/80",
                    pathname === "/calculator"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  Calculator
                </Link>
                <Link
                  href="/colleges"
                  className={cn(
                    "relative inline-block min-w-[76px] shrink-0 transition-colors hover:text-foreground/80",
                    pathname === "/colleges"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  Colleges
                </Link>
                <Link
                  href="/specialty"
                  className={cn(
                    "rrelative inline-block min-w-[63px] shrink-0 transition-colors hover:text-foreground/80",
                    pathname === "/specialty"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  Specialty
                </Link>
                <Link
                  href="/career-guidance"
                  className={cn(
                    "relative inline-block min-w-[124px] shrink-0 whitespace-nowrap transition-colors hover:text-foreground/80",
                    pathname === "/career-guidance"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  Career guidance
                </Link>
                <Link
                  href="/faq"
                  className={cn(
                    "relative inline-block min-w-[31px] shrink-0 transition-colors hover:text-foreground/80",
                    pathname === "/faq"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  FAQ
                </Link>
              </nav>
            </nav>
            <div className="flex flex-row items-center justify-start gap-[24px] text-center font-dm-sans text-base text-shade-white">
              <Select>
                <SelectTrigger className="w-[80px] rounded-[3px] !py-6">
                  <SelectValue placeholder="EN" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
                  >
                    <img
                      className="inline-block size-[50px] lg:hidden"
                      alt=""
                      src="/burger-menu.png"
                    />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="top"
                  className="flex size-full flex-col items-center justify-center"
                >
                  <Link className="mb-3 w-full rounded-md border p-3" href="/">
                    {/* <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-primary text-md">About</span>
                      <span className="text-muted-foreground text-xs">Discover why we creted this platfrom.</span>
                    </div> */}
                    <div className="flex size-full items-center justify-center space-x-5 ">
                      <div className="flex flex-row items-center justify-center">
                        <img
                          className="size-[20px]"
                          alt="logo"
                          src="/logo.png"
                        />
                        <span className="text-shade-white">STUDY</span>
                      </div>
                      <div className="font-medium">
                        Find your perfect college fit with our quiz.
                      </div>
                    </div>
                  </Link>

                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">About</span>
                      <span className="text-xs text-muted-foreground">
                        Discover why we creted this platfrom.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">Colleges</span>
                      <span className="text-xs text-muted-foreground">
                        View Colleage that fits your need.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">Calculator</span>
                      <span className="text-xs text-muted-foreground">
                        Calculate your gols.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">
                        Career Guidence
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Seach for cereers that you love.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">Specialty</span>
                      <span className="text-xs text-muted-foreground">
                        Get advice form specialiest.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">FAQ</span>
                      <span className="text-xs text-muted-foreground">
                        Ask question about this platfrom.
                      </span>
                    </div>
                  </Link>

                  <div className="flex w-full flex-col items-center justify-center gap-[14px] py-3 text-base">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-col items-start justify-start">
                        <div className="relative inline-block min-w-[118px] leading-[100%]">
                          Contact email:
                        </div>
                      </div>
                      <b className="relative inline-block min-w-[117px] whitespace-nowrap font-dm-sans text-mediumpurple">
                        info@ustudy.io
                      </b>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-[4px]">
                      <div className="relative leading-[100%]">
                        Our Social Media:
                      </div>
                    </div>
                    <div className="mx-auto flex flex-row items-start justify-start gap-[8px]">
                      <img
                        className="relative size-6 min-h-[24px] object-cover"
                        loading="lazy"
                        alt=""
                        src="/instragam.png"
                      />
                      <img
                        className="relative size-6 min-h-[24px]"
                        loading="lazy"
                        alt=""
                        src="/linkdin.png"
                      />
                      <img
                        className="relative size-6 min-h-[24px]"
                        loading="lazy"
                        alt=""
                        src="/facebook.png"
                      />
                      <img
                        className="relative size-6 min-h-[24px]"
                        alt=""
                        src="/telegram.png"
                      />
                      <img
                        className="relative size-6 min-h-[24px]"
                        alt=""
                        src="/raddit.png"
                      />
                      <img
                        className="relative size-6 min-h-[24px]"
                        alt=""
                        src="/twitter.png"
                      />
                    </div>
                    <div className="absolute bottom-[-11px] right-[64px] z-[1] !m-0 flex size-10 items-center justify-center">
                      <img
                        className="absolute left-[-24px] top-[-23px] z-[1] size-full object-contain [transform:scale(2.225)]"
                        alt=""
                        src="/mask-contract.png"
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div
                className="hidden cursor-pointer flex-row items-start justify-start lg:flex"
                onClick={onButtonsContainerClick}
              >
                <div className="flex flex-row items-center justify-center whitespace-nowrap rounded bg-blueviolet-200 px-[23px] py-4">
                  <Link
                    href="/signup"
                    className={cn(
                      "relative inline-block min-w-[112px] leading-[16px]"
                    )}
                  >
                    Sign Up/Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>
  )
}

export default Header