/* eslint-disable @next/next/no-img-element */
"use client"

// import {
//   OrganizationSwitcher,
//   SignInButton,
//   SignOutButton,
//   useAuth,
//   UserButton,
// } from "@clerk/nextjs"
import React, { useCallback, useEffect, useState } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs"
import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  ViewVerticalIcon,
} from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleOff,
  Copy,
  CreditCard,
  File,
  Home,
  Inbox,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Users2,
} from "lucide-react"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { CardsCookieSettings } from "@/registry/default/example/cards/cookie-settings"
import { CardsReportIssue } from "@/registry/default/example/cards/report-issue"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { buttonVariants } from "@/registry/new-york/ui/button"
import { ScrollArea } from "@/registry/new-york/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/registry/new-york/ui/sheet"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { useToast } from "@/registry/default/ui/use-toast"

const firebaseConfig = {
  apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
  authDomain: "ustudy-96678.firebaseapp.com",
  projectId: "ustudy-96678",
  storageBucket: "ustudy-96678.appspot.com",
  messagingSenderId: "581632635532",
  appId: "1:581632635532:web:51ccda7d7adce6689a81a9",
}

const app = initializeApp(firebaseConfig)
const db: any = getFirestore(app)
const auth = getAuth(app);




const Header: NextPage = () => {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const { sessionId } = useAuth()
  const { toast } = useToast()


  const signOutUser = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signout successfull!!!",
        description: `We are hoping to see you again.`,
      })
      // Sign-out successful.
    } catch (error) {
      // An error happened.
    }
  }

  return (
    <section className=" bg-background/95 supports-[backdrop-filter]:bg-background/60 !sticky !top-0 z-50 w-full !border-b backdrop-blur">
      <header className="font-headings-desktop-poppins-16px-regular text-blueviolet-200 box-border flex h-[88px] max-w-full flex-1 flex-col items-start gap-[20px] px-0 py-5 text-left text-8xl lg:justify-start">
        <div className="hidden h-12 w-[158px]" />
        <div className="mq750:box-border mq750:px-10 box-border flex max-w-full flex-row items-start justify-start self-stretch px-20 py-0">
          <div className="flex max-w-full flex-1 flex-row items-start justify-start gap-[24px]">
            <div className="box-border flex w-[143px] flex-col items-start justify-start">
              <Link href="/">
                <h2 className="flex flex-row items-center justify-center">
                  <img className="size-[33px]" alt="logo" src="/logo.png" />
                  <span className="text-shade-white">STUDY</span>
                </h2>
              </Link>
            </div>
            <div className="flex flex-1 flex-col items-start justify-start px-0 pb-0 pt-1 lg:hidden">
              <div className="bg-neutrals-3 relative h-10 w-px" />
            </div>
            <nav className="m-0 box-border hidden max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-[13.5px] lg:flex">
              <nav className="font-dm-sans text-lightsteelblue-200 m-0 flex w-[468.9px] max-w-full flex-row items-start justify-between gap-[20px] text-left text-base">
                <Link
                  href="/about"
                  className={cn(
                    "hover:text-foreground/80 relative inline-block min-w-[46.9px] shrink-0 transition-colors",
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
                    "hover:text-foreground/80 relative inline-block min-w-[76px] shrink-0 transition-colors",
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
                    "hover:text-foreground/80 relative inline-block min-w-[76px] shrink-0 transition-colors",
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
                    "rrelative hover:text-foreground/80 inline-block min-w-[63px] shrink-0 transition-colors",
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
                    "hover:text-foreground/80 relative inline-block min-w-[124px] shrink-0 whitespace-nowrap transition-colors",
                    pathname === "/career-guidance"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  Career guidance
                </Link>
                <Link
                  href="/support"
                  className={cn(
                    "hover:text-foreground/80 relative inline-block min-w-[31px] shrink-0 transition-colors",
                    pathname === "/support"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  Support
                </Link>
                <Link
                  href="/faq"
                  className={cn(
                    "hover:text-foreground/80 relative inline-block min-w-[31px] shrink-0 transition-colors",
                    pathname === "/faq"
                      ? "text-[#804DFE]"
                      : "text-foreground/60"
                  )}
                >
                  FAQ
                </Link>

              </nav>
            </nav>
            <div className="font-dm-sans text-shade-white mt-2 flex flex-row items-center justify-center gap-2 text-center text-base">
              <Select>
                <SelectTrigger className="w-[80px] rounded-md">
                  <SelectValue placeholder="EN" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Languages</SelectLabel> */}
                    <SelectItem value="apple">Bangla</SelectItem>
                    <SelectItem value="banana">English</SelectItem>
                    <SelectItem value="blueberry">Hindi</SelectItem>
                    <SelectItem value="grapes">French</SelectItem>
                    <SelectItem value="pineapple">Spain</SelectItem>
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
                      <span className="text-muted-foreground text-xs">
                        Discover why we creted this platfrom.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">Colleges</span>
                      <span className="text-muted-foreground text-xs">
                        View Colleage that fits your need.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">Calculator</span>
                      <span className="text-muted-foreground text-xs">
                        Calculate your gols.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">
                        Career Guidence
                      </span>
                      <span className="text-muted-foreground text-xs">
                        Seach for cereers that you love.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">Specialty</span>
                      <span className="text-muted-foreground text-xs">
                        Get advice form specialiest.
                      </span>
                    </div>
                  </Link>
                  <Link className="w-full  border-b p-5" href="/colleges">
                    <div className="flex flex-col items-start justify-start space-y-1 ">
                      <span className="text-md text-primary">FAQ</span>
                      <span className="text-muted-foreground text-xs">
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
                      <b className="font-dm-sans text-mediumpurple relative inline-block min-w-[117px] whitespace-nowrap">
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
              >
                {!sessionId ? (
                  <>
                    {
                      auth.currentUser ? (<Button onClick={signOutUser} className="bg-blueviolet-200" variant="outline">
                        Signout
                      </Button>) :
                        (<Link href="/login">
                          <Button className="bg-blueviolet-200" variant="outline">
                            Sign Up/Log In
                          </Button>
                        </Link>)
                    }
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Feedback</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[425px] border-none !p-0">
                        <CardsReportIssue />
                      </PopoverContent>
                    </Popover>

                    <Button variant="outline">
                      <OrganizationSwitcher
                        appearance={{
                          elements: {
                            organizationPreviewAvatarBox: "size-8",
                          },
                        }}
                      />
                    </Button>

                    <Popover>
                      <PopoverTrigger asChild>
                        {/* <Button variant="outline">Open popover</Button> */}
                        <div className="rounded-full border p-2.5">
                          <Bell className="size-4" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="mr-20 max-h-[500px] w-[425px] !p-5">
                        {/* <CardsReportIssue />
                    <CardsCookieSettings /> */}
                        {/* <Notifications /> */}





                        {/* <ScrollArea className="h-[500px] w-full !p-5">
                          <Tabs className="w-full h-full" defaultValue="week">
                            <div className="flex items-center">
                              <TabsList>
                                <TabsTrigger value="week">All</TabsTrigger>
                                <TabsTrigger value="month">Archive</TabsTrigger>
                                <TabsTrigger value="year">Comments</TabsTrigger>
                              </TabsList>
                              <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1 text-sm p-3"
                                    >
                                      <Settings className="size-4" />
                                      <span className="sr-only sm:not-sr-only">
                                        Settings
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Filter by
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                      Fulfilled
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                      Declined
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                      Refunded
                                    </DropdownMenuCheckboxItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <TabsContent value="week" className="!border-none !p-0 !h-[500px] !w-full flex items-center justify-center bg-red-500">
                              <div className="bg-secondary flex items-center justify-center p-10 rounded-full">
                                <Inbox />
                              </div>
                            </TabsContent>
                          </Tabs>
                        </ScrollArea> */}

                        <Tabs defaultValue="all">
                          <div className="flex items-center">
                            <TabsList>
                              <TabsTrigger value="all">All</TabsTrigger>
                              <TabsTrigger value="archive">Archive</TabsTrigger>
                              <TabsTrigger value="comments">Comments</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 p-3 text-sm"
                                  >
                                    <Settings className="size-4" />
                                    <span className="sr-only sm:not-sr-only">
                                      Settings
                                    </span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>
                                    Filter by
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuCheckboxItem checked>
                                    Fulfilled
                                  </DropdownMenuCheckboxItem>
                                  <DropdownMenuCheckboxItem>
                                    Declined
                                  </DropdownMenuCheckboxItem>
                                  <DropdownMenuCheckboxItem>
                                    Refunded
                                  </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          {/*
                          <TabsContent value="all" className="!border-none !p-0 !w-full flex items-center justify-center ">
                            <div className="bg-secondary flex items-center justify-center p-10 rounded-full">
                              <Inbox />
                            </div>
                            <span>Nothing to show at All</span>
                          </TabsContent> */}
                          <TabsContent value="all" className="flex !w-full flex-col items-center justify-center gap-3 !border-none !p-0">
                            <div className="flex h-[400px] w-full flex-col items-center justify-center gap-3">
                              <div className="bg-secondary flex size-24 items-center justify-center rounded-full ">
                                <Inbox />
                              </div>
                              <span>Nothing to show at All</span>
                            </div>

                          </TabsContent>
                          <TabsContent value="archive" className="flex !w-full flex-col items-center justify-center gap-3 !border-none !p-0">
                            <div className="flex h-[400px] w-full flex-col items-center justify-center gap-3">
                              <div className="bg-secondary flex size-24 items-center justify-center rounded-full ">
                                <Inbox />
                              </div>
                              <span>Nothing to show at Archive</span>
                            </div>
                          </TabsContent>
                          <TabsContent value="comments" className="flex !w-full flex-col items-center justify-center gap-3 !border-none !p-0">
                            <div className="flex h-[400px] w-full flex-col items-center justify-center gap-3">
                              <div className="bg-secondary flex size-24 items-center justify-center rounded-full ">
                                <Inbox />
                              </div>
                              <span>Nothing to show at Comments</span>
                            </div>
                          </TabsContent>
                          {/* <TabsContent value="archive" className="!border-none !p-0 h-[400px] !w-full flex items-center justify-center flex-col gap-3">
                              <div className="bg-secondary flex items-center justify-center p-10 rounded-full">
                                <Inbox />
                              </div>
                              <span>Nothing to show at Archive</span>
                            </TabsContent>
                            <TabsContent value="comments" className="!border-none !p-0 h-[400px] !w-full flex items-center justify-center flex-col gap-3">
                              <div className="bg-secondary flex items-center justify-center p-10 rounded-full">
                                <Inbox />
                              </div>
                              <span>Nothing to show at Comments</span>
                            </TabsContent> */}

                        </Tabs>

                      </PopoverContent>
                    </Popover>

                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "size-8",
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>
  )
}

export default Header
