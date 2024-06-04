"use client"

/* eslint-disable tailwindcss/no-contradicting-classname */
import React, { ReactNode, useEffect, useRef, useState } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph"
import { cva, type VariantProps } from "class-variance-authority"
import Autoplay from "embla-carousel-autoplay"
import { Tag, TagInput } from "emblor"
import { initializeApp } from "firebase/app"
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
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronsUpDown,
  CloudUpload,
  File,
  GlobeIcon,
  Home,
  LineChart,
  ListFilter,
  Loader2,
  LocateIcon,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  Plus,
  PlusCircle,
  Projector,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  X,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button as AnimatedButton } from "@/components/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form"
import { toast, useToast } from "@/registry/default/ui/use-toast"

const firebaseConfig = {
  apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
  authDomain: "ustudy-96678.firebaseapp.com",
  projectId: "ustudy-96678",
  storageBucket: "ustudy-96678.appspot.com",
  messagingSenderId: "581632635532",
  appId: "1:581632635532:web:51ccda7d7adce6689a81a9",
}
// Iniialize Firebase
const app = initializeApp(firebaseConfig)
// Database
const db: any = getFirestore(app)

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

const Question = () => {
  const [inputedMainQuestion, setInputedMainQuestion] = React.useState("")
  const [resultsTag, setResultslTag] = React.useState<any[]>([])
  const [answersTag, setAnswersTag] = React.useState<any[]>([])
  const [docs, setDocs] = useState<any[]>([])
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const handleConfetti = async () => {
    const { clientWidth, clientHeight } = document.documentElement
    const boundingBox = buttonRef.current?.getBoundingClientRect?.()
    const targetY = boundingBox?.y ?? 0
    const targetX = boundingBox?.x ?? 0
    const targetWidth = boundingBox?.width ?? 0
    const targetCenterX = targetX + targetWidth / 2
    const confetti = (await import("canvas-confetti")).default
    confetti({
      zIndex: 999,
      particleCount: 10000,
      spread: 70,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    })
  }
  const [inputedValues, setInputedValues] = React.useState(false)
  const [sheetToggle, setSheetToggle] = React.useState(false)
  const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true)
  const [isOpen, setIsOpen] = React.useState(false)
  const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false)
  const containerRef = useRef(null)
  const initialValue = [
    {
      id: "1",
      type: ELEMENT_PARAGRAPH,
      children: [{ text: "Hello, World!" }],
    },
  ]
  const [phone, setPhone] = React.useState("+1 (408) 996–1010")
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  function showPhoneNumberDetails() {
    setPhoneNumberDetails(!phoneNumberDetails)
  }

  const [inputedRuralQuota1, setInputedRuralQuota1] = React.useState("")
  const [inputedRuralQuota2, setInputedRuralQuota2] = React.useState("")
  const [inputedRuralQuota3, setInputedRuralQuota3] = React.useState("")
  const [inputedLevel, setInputedLevel] = React.useState("")
  const [inputedOrphanQuota2, setInputedOrphanQuota2] = React.useState("")
  const [inputedDisabilitiesQuota2, setInputedDisabilitiesQuota2] =
    React.useState("")
  const [inputedOrphanQuota3, setInputedOrphanQuota3] = React.useState("")
  const [inputedGeneralCompetition1, setInputedGeneralCompetition1] =
    React.useState("")
  const [inputedLargeFamiliesQuota2, setInputedLargeFamiliesQuota2] =
    React.useState("")
  const [inputedGeneralCompetition2, setInputedGeneralCompetition2] =
    React.useState("")
  const [inputedGeneralCompetition3, setInputedGeneralCompetition3] =
    React.useState("")
  const [inputedSpecialtyCode, setInputedSpecialtyCode] = React.useState("")
  const [inputedDisabilitiesQuota1, setInputedDisabilitiesQuota1] =
    React.useState("")
  const [inputedAverageSalary, setInputedAverageSalary] = React.useState("")
  const [inputedSubjects, setInputedSubjects] = React.useState("")
  const [inputedLargeFamiliesQuota1, setInputedLargeFamiliesQuota1] =
    React.useState("")
  const [inputedThreshold, setInputedThreshold] = React.useState("")
  const [inputedSpecialtyName, setInputedSpecialtyName] = React.useState("")
  const [inputedDisabilitiesQuota3, setInputedDisabilitiesQuota3] =
    React.useState("97")
  const [inputedOrphanQuota1, setInputedOrphanQuota1] = React.useState("")
  const [inputedUniversities, setInputedUniversities] = React.useState("")
  const [inputedLargeFamiliesQuota3, setInputedLargeFamiliesQuota3] =
    React.useState("")
  const [inputedAvailableGrantCount, setInputedAvailableGrantCount] =
    React.useState("")
  const [inputedDemandForSpecialty, setInputedDemandForSpecialty] =
    React.useState("")

  const handleRuralQuota1Change = (event: any) => {
    setInputedRuralQuota1(event.target.value)
  }

  const handleRuralQuota2Change = (event: any) => {
    setInputedRuralQuota2(event.target.value)
  }

  const handleRuralQuota3Change = (event: any) => {
    setInputedRuralQuota3(event.target.value)
  }

  const handleLevelChange = (event: any) => {
    setInputedLevel(event.target.value)
  }

  const handleOrphanQuota2Change = (event: any) => {
    setInputedOrphanQuota2(event.target.value)
  }

  const handleDisabilitiesQuota2Change = (event: any) => {
    setInputedDisabilitiesQuota2(event.target.value)
  }

  const handleOrphanQuota3Change = (event: any) => {
    setInputedOrphanQuota3(event.target.value)
  }

  const handleGeneralCompetition1Change = (event: any) => {
    setInputedGeneralCompetition1(event.target.value)
  }

  const handleLargeFamiliesQuota2Change = (event: any) => {
    setInputedLargeFamiliesQuota2(event.target.value)
  }

  const handleGeneralCompetition2Change = (event: any) => {
    setInputedGeneralCompetition2(event.target.value)
  }

  const handleGeneralCompetition3Change = (event: any) => {
    setInputedGeneralCompetition3(event.target.value)
  }

  const handleSpecialtyCodeChange = (event: any) => {
    setInputedSpecialtyCode(event.target.value)
  }

  const handleDisabilitiesQuota1Change = (event: any) => {
    setInputedDisabilitiesQuota1(event.target.value)
  }

  const handleAverageSalaryChange = (event: any) => {
    setInputedAverageSalary(event.target.value)
  }

  const handleSubjectsChange = (event: any) => {
    setInputedSubjects(event.target.value)
  }

  const handleLargeFamiliesQuota1Change = (event: any) => {
    setInputedLargeFamiliesQuota1(event.target.value)
  }

  const handleThresholdChange = (event: any) => {
    setInputedThreshold(event.target.value)
  }

  const handleSpecialtyNameChange = (event: any) => {
    setInputedSpecialtyName(event.target.value)
  }

  const handleDisabilitiesQuota3Change = (event: any) => {
    setInputedDisabilitiesQuota3(event.target.value)
  }

  const handleOrphanQuota1Change = (event: any) => {
    setInputedOrphanQuota1(event.target.value)
  }

  const handleUniversitiesChange = (event: any) => {
    setInputedUniversities(event.target.value)
  }

  const handleLargeFamiliesQuota3Change = (event: any) => {
    setInputedLargeFamiliesQuota3(event.target.value)
  }

  const handleAvailableGrantCountChange = (event: any) => {
    setInputedAvailableGrantCount(event.target.value)
  }

  const handleDemandForSpecialtyChange = (event: any) => {
    setInputedDemandForSpecialty(event.target.value)
  }

  const [loadingMore, setLoadingMore] = React.useState(false)
  const [inputedName, setInputedName] = React.useState("")
  const [inputedEmail, setInputedEmail] = React.useState("")
  const [inputedStatus, setInputedStatus] = React.useState("")
  const [inputedFacebook, setInputedFacebook] = React.useState("")
  const [inputedInstragam, setInputedInstragam] = React.useState("")
  const [inputedCost, setInputedCost] = React.useState("")
  const [inputedWebsite, setInputedWebsite] = React.useState("")
  const [inputedCode, setInputedCode] = React.useState("")
  const [inputedHostel, setInputedHostel] = React.useState("")
  const [inputedMilitary, setInputedMilitary] = React.useState("")
  const [inputedPhoneNumber, setInputedPhoneNumber] = React.useState(phone)
  const [inputedLogo, setInputedLogo] = React.useState("")
  const [inputedDescription, setInputedDescription] = React.useState("")
  const [inputedImages, setInputedImages] = React.useState([])
  const handleNameChange = (event: any) => {
    setInputedName(event.target.value)
  }
  const handleEmailChange = (event: any) => {
    setInputedEmail(event.target.value)
  }
  const handleStatusChange = (event: any) => {
    setInputedStatus(event)
  }
  const handleFacebookChange = (event: any) => {
    setInputedFacebook(event.target.value)
  }
  const handleInstagramChange = (event: any) => {
    setInputedInstragam(event.target.value)
  }
  const handleCostChange = (event: any) => {
    setInputedCost(event.target.value)
  }
  const handleWebsiteChange = (event: any) => {
    setInputedWebsite(event.target.value)
  }
  const handleCodeChange = (event: any) => {
    setInputedCode(event.target.value)
  }
  const handleHostelChange = (event: any) => {
    setInputedHostel(event)
  }
  const handleMilitaryChange = (event: any) => {
    setInputedMilitary(event)
  }
  const handleDescriptionChange = (event: any) => {
    setInputedDescription(JSON.stringify(event))
  }
  const handleInputedValues = () => {
    setInputedValues(!inputedValues)
  }
  const handleMainQuestion = (event: any) => {
    setInputedMainQuestion(event.target.value)
  }

  // This page
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true)
      const q = query(collection(db, "questions"), limit(8))
      const querySnapshot = await getDocs(q)
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setDocs(newDocs)
      // Configuring Data for Update:
      docs.map((item: any) => {
        setInputedMainQuestion(item.mainQuestion)
        setAnswersTag(item.answers)
        setResultslTag(item.results)
      })
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
      setLoading(false)
    }
    fetchDocs()
  }, [])

  const loadMore = async () => {
    setLoading(true)

    const q = query(collection(db, "questions"), startAfter(lastDoc), limit(8))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length === 0) {
      toast({
        title: "There is no more data in the database.",
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
            <span>Please add more data to load more!</span>
          </div>
        ),
      })
      setLoading(false)
      return
    }
    const newDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setDocs([...docs, ...newDocs])
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
    setLoading(false)
  }

  if (loading) {
    return (
      <main className="h-auto w-full px-[5%] py-5">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-center text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">
            FAQ
          </span>
        </div>
        <div className="admin-panel-lists-loading place-content-center">
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div>
      <main className="h-auto min-h-[90vh] w-full px-[5%] py-5 pb-7">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-center text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">
            Questions
          </span>
          <Link href="/create-question">
            <Button size="sm">Add New Question</Button>
          </Link>
        </div>
        <div className="admin-panel-lists place-content-center">
          {docs.map((items) => (
            <div key={items.id}>
              <Card className="hover-glow-border relative w-full bg-primary-foreground">
                <CardHeader>
                  <CardTitle>{items.mainQuestion}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {items.answers.length > 0 ? (
                      <div className="space-y-3">
                        {items.answers.map((index: any) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between rounded-lg border p-3"
                            >
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {index}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="icon" variant="ghost">
                                  <CheckIcon className="size-5" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No Answers are provided.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <CheckIcon className="size-5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start justify-start gap-2">
                  {items.results.length > 0 ? (
                    <div className="flex w-full items-center gap-2">
                      {items.results.map((index: any) => {
                        return (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-center text-xs"
                          >
                            {index}
                          </Badge>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex w-full items-center gap-2">
                      <Badge variant="outline">Nothing</Badge>
                    </div>
                  )}
                  <div className="mt-3 flex w-full justify-between gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View</Button>
                      </DialogTrigger>
                      <DialogContent className="w-[55%] min-w-[300px] max-w-[750px]">
                        <div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg border p-3 text-sm">
                          <div className="flex gap-2 p-3">
                            <p>MainQuestion: </p>
                            <span className="font-semibold">
                              {items.mainQuestion ||
                                "No Main Questing is Provided."}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex gap-2 p-3">
                            <p>Answers: </p>
                            <span className="font-semibold">
                              {JSON.stringify(items.answers, null, 2) ||
                                "No Main Questing is Provided."}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex gap-2 p-3">
                            <p>Results: </p>
                            <span className="font-semibold">
                              {JSON.stringify(items.results, null, 2) ||
                                "No Main Questing is Provided."}
                            </span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button onClick={handleConfetti} variant="default">
                            Update
                          </Button>
                        </SheetTrigger>
                        <SheetContent
                          side={"bottom"}
                          className="mx-auto h-[90vh] !max-w-[1600px] rounded-xl"
                        >
                          <ScrollArea className="size-full rounded-md border">
                            <div className="create-university min-h-screen !min-w-full space-y-3 p-10 pt-3 lg:flex lg:!min-w-[1500px] lg:flex-col">
                              <div className="action my-3 hidden w-full items-center justify-between lg:flex ">
                                <div className="flex size-full items-start justify-start space-x-3">
                                  <Link href="/questions" className="z-50">
                                    <AnimatedButton
                                      variant="expandIcon"
                                      Icon={ArrowLeftIcon}
                                      iconPlacement="left"
                                      className="border border-input bg-background text-accent-foreground hover:bg-accent"
                                    >
                                      Back
                                    </AnimatedButton>
                                  </Link>
                                  <AnimatedButton
                                    onClick={handleInputedValues}
                                    variant="expandIcon"
                                    Icon={Projector}
                                    iconPlacement="left"
                                    className="border border-input bg-background text-accent-foreground hover:bg-accent"
                                  >
                                    {inputedValues ? "Hide" : "Show"} Inputed
                                    Values
                                  </AnimatedButton>
                                </div>

                                <div className="flex size-full items-end justify-end space-x-3">
                                  {/* <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                                                Sync Uploaded Files
                                                            </AnimatedButton> */}
                                  <Button
                                    className="!py-0"
                                    // disabled={createButtonDisabled}
                                    onClick={async () => {
                                      const { clientWidth, clientHeight } =
                                        document.documentElement
                                      const boundingBox =
                                        buttonRef.current?.getBoundingClientRect?.()
                                      const targetY = boundingBox?.y ?? 0
                                      const targetX = boundingBox?.x ?? 0
                                      const targetWidth =
                                        boundingBox?.width ?? 0
                                      const targetCenterX =
                                        targetX + targetWidth / 2
                                      const confetti = (
                                        await import("canvas-confetti")
                                      ).default
                                      confetti({
                                        zIndex: 999,
                                        particleCount: 100,
                                        spread: 70,
                                        origin: {
                                          y: targetY / clientHeight,
                                          x: targetCenterX / clientWidth,
                                        },
                                      })

                                      const updateRef = doc(
                                        db,
                                        "questions",
                                        items.id
                                      )
                                      const Update: any = await updateDoc(
                                        updateRef,
                                        {
                                          mainQuestion: inputedMainQuestion,
                                          answers: answersTag.map(
                                            (obj) => obj.text
                                          ),
                                          results: resultsTag.map(
                                            (obj) => obj.text
                                          ),
                                        }
                                      )

                                      toast({
                                        title:
                                          "University has been Updated Successfully.",
                                        description: (
                                          <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                            <span>
                                              You Can now view and delete this
                                              university!
                                            </span>
                                            <pre className="max-h-[500px] overflow-auto bg-background">
                                              {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
                                            </pre>
                                          </div>
                                        ),
                                      })

                                      // setSheetToggle(!sheetToggle)
                                      // router.push('/specialities')
                                      // setSheetToggle(true)

                                      // console.log("Document written with ID: ", Update.id);
                                      // const newDocs = docs.filter((item) => item.id !== items.id);
                                      // setDocs(newDocs);
                                      // fetchDocs()
                                    }}
                                  >
                                    {/* {
                                                                    createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                } */}
                                    Update
                                  </Button>
                                </div>
                              </div>

                              {inputedValues && (
                                <div className="!mb-3 flex w-max min-w-full flex-col gap-2 rounded-lg border p-3 text-sm">
                                  <div className="flex gap-2 p-3">
                                    <p>MainQestion: </p>
                                    <span className="font-semibold">
                                      {inputedMainQuestion ||
                                        "No MainQestion is Provided."}
                                    </span>
                                  </div>
                                  <Separator />
                                  <div className="flex gap-2 p-3">
                                    <p>Answers: </p>
                                    <span className="font-semibold">
                                      {JSON.stringify(answersTag, null, 2) ||
                                        "No Answers is Provided."}
                                    </span>
                                  </div>
                                  <Separator />
                                  <div className="flex gap-2 p-3">
                                    <p>Results: </p>
                                    <span className="font-semibold">
                                      {JSON.stringify(resultsTag, null, 2) ||
                                        "No Results is Provided."}
                                    </span>
                                  </div>
                                </div>
                              )}

                              <div className="hover-glow-border flex h-auto w-full flex-col items-center justify-center space-y-3 rounded-md border p-10">
                                <h1 className="text-4xl w-full text-left font-bold">
                                  Answers
                                </h1>
                                <TagInput
                                  placeholder="Enter Your Results"
                                  tags={answersTag}
                                  className="sm:min-w-[450px]"
                                  setTags={(newTags) => {
                                    setAnswersTag(newTags)
                                  }}
                                />
                              </div>
                              <div className="hover-glow-border flex h-auto w-full flex-col items-center justify-center space-y-3 rounded-md border p-10">
                                <h1 className="text-4xl w-full text-left font-bold">
                                  Results
                                </h1>
                                <TagInput
                                  placeholder="Enter Your Results"
                                  tags={resultsTag}
                                  className="sm:min-w-[450px]"
                                  setTags={(newTags) => {
                                    setResultslTag(newTags)
                                  }}
                                />
                              </div>
                              <div className="hover-glow-border flex h-auto w-full flex-col items-center justify-center space-y-3 rounded-md border p-10">
                                <h1 className="text-4xl w-full text-left font-bold">
                                  MainQuestion
                                </h1>
                                <Input
                                  onChange={handleMainQuestion}
                                  type="text"
                                  placeholder="Enter MainQuestion"
                                />
                              </div>

                              <div className="action my-3 flex w-full flex-col items-start justify-start space-y-3 lg:hidden lg:space-y-0">
                                <Link href="/questions" className="z-50 w-full">
                                  <AnimatedButton
                                    variant="expandIcon"
                                    Icon={ArrowLeftIcon}
                                    iconPlacement="left"
                                    className="!min-w-full border border-input bg-secondary text-accent-foreground hover:bg-accent lg:w-auto"
                                  >
                                    Back
                                  </AnimatedButton>
                                </Link>
                                <AnimatedButton
                                  onClick={handleInputedValues}
                                  variant="expandIcon"
                                  Icon={Projector}
                                  iconPlacement="left"
                                  className="w-full border border-input bg-background text-accent-foreground hover:bg-accent"
                                >
                                  {inputedValues ? "Hide" : "Show"} Inputed
                                  Values
                                </AnimatedButton>
                                {/* <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                                                            Sync Uploaded Files
                                                        </AnimatedButton> */}
                                <AnimatedButton
                                  className="w-full !py-0"
                                  // disabled={createButtonDisabled}
                                  onClick={async () => {
                                    const { clientWidth, clientHeight } =
                                      document.documentElement
                                    const boundingBox =
                                      buttonRef.current?.getBoundingClientRect?.()
                                    const targetY = boundingBox?.y ?? 0
                                    const targetX = boundingBox?.x ?? 0
                                    const targetWidth = boundingBox?.width ?? 0
                                    const targetCenterX =
                                      targetX + targetWidth / 2
                                    const confetti = (
                                      await import("canvas-confetti")
                                    ).default
                                    confetti({
                                      zIndex: 999,
                                      particleCount: 100,
                                      spread: 70,
                                      origin: {
                                        y: targetY / clientHeight,
                                        x: targetCenterX / clientWidth,
                                      },
                                    })
                                    const updateRef = doc(
                                      db,
                                      "questions",
                                      items.id
                                    )
                                    const Update: any = await updateDoc(
                                      updateRef,
                                      {
                                        mainQuestion: inputedMainQuestion,
                                        answers: answersTag.map(
                                          (obj) => obj.text
                                        ),
                                        results: resultsTag.map(
                                          (obj) => obj.text
                                        ),
                                      }
                                    )

                                    toast({
                                      title:
                                        "University has been Updated Successfully.",
                                      description: (
                                        <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
                                          <span>
                                            You Can now view and delete this
                                            question!
                                          </span>
                                          <pre className="max-h-[500px] overflow-auto bg-background">
                                            {/* <code className="text-muted-foreground bg-secondary">{JSON.stringify(Update.id, null, 2)}</code> */}
                                          </pre>
                                        </div>
                                      ),
                                    })

                                    // router.push('/specialities')
                                    // setSheetToggle(true)

                                    // setSheetToggle(!sheetToggle)
                                    // router.push('/university')
                                    // fetchDocs()
                                  }}
                                >
                                  {/* {
                                                                createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            } */}
                                  Update
                                </AnimatedButton>
                              </div>
                            </div>
                          </ScrollArea>
                        </SheetContent>
                      </Sheet>
                      <Button
                        onClick={async () => {
                          await deleteDoc(doc(db, "questions", items.id))
                          const newDocs = docs.filter(
                            (item) => item.id !== items.id
                          )
                          setDocs(newDocs)
                        }}
                        className="bg-red-500 text-white hover:bg-red-600"
                        size="sm"
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              {/* {Object.keys(items).map((key) => (
              <li key={key}>
                <strong>{key}:</strong> {items[key]}
              </li>
            ))} */}
            </div>
          ))}
        </div>

        <Button
          variant={"outline"}
          className="mt-7 w-full"
          onClick={loadMore}
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Load More
        </Button>
      </main>
    </div>
  )
}

const FrameComponent: NextPage = () => {
  const [inputedMainQuestion, setInputedMainQuestion] = React.useState("")
  const [resultsTag, setResultslTag] = React.useState<any[]>([])
  const [answersTag, setAnswersTag] = React.useState<any[]>([])
  const [docs, setDocs] = useState<any[]>([])
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const handleConfetti = async () => {
    const { clientWidth, clientHeight } = document.documentElement
    const boundingBox = buttonRef.current?.getBoundingClientRect?.()
    const targetY = boundingBox?.y ?? 0
    const targetX = boundingBox?.x ?? 0
    const targetWidth = boundingBox?.width ?? 0
    const targetCenterX = targetX + targetWidth / 2
    const confetti = (await import("canvas-confetti")).default
    confetti({
      zIndex: 999,
      particleCount: 10000,
      spread: 70,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    })
  }
  const [inputedValues, setInputedValues] = React.useState(false)
  const [sheetToggle, setSheetToggle] = React.useState(false)
  const [createButtonDisabled, setCreateButtonDisabled] = React.useState(true)
  const [isOpen, setIsOpen] = React.useState(false)
  const [phoneNumberDetails, setPhoneNumberDetails] = React.useState(false)
  const containerRef = useRef(null)
  const initialValue = [
    {
      id: "1",
      type: ELEMENT_PARAGRAPH,
      children: [{ text: "Hello, World!" }],
    },
  ]
  const [phone, setPhone] = React.useState("+1 (408) 996–1010")
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  function showPhoneNumberDetails() {
    setPhoneNumberDetails(!phoneNumberDetails)
  }

  const [inputedRuralQuota1, setInputedRuralQuota1] = React.useState("")
  const [inputedRuralQuota2, setInputedRuralQuota2] = React.useState("")
  const [inputedRuralQuota3, setInputedRuralQuota3] = React.useState("")
  const [inputedLevel, setInputedLevel] = React.useState("")
  const [inputedOrphanQuota2, setInputedOrphanQuota2] = React.useState("")
  const [inputedDisabilitiesQuota2, setInputedDisabilitiesQuota2] =
    React.useState("")
  const [inputedOrphanQuota3, setInputedOrphanQuota3] = React.useState("")
  const [inputedGeneralCompetition1, setInputedGeneralCompetition1] =
    React.useState("")
  const [inputedLargeFamiliesQuota2, setInputedLargeFamiliesQuota2] =
    React.useState("")
  const [inputedGeneralCompetition2, setInputedGeneralCompetition2] =
    React.useState("")
  const [inputedGeneralCompetition3, setInputedGeneralCompetition3] =
    React.useState("")
  const [inputedSpecialtyCode, setInputedSpecialtyCode] = React.useState("")
  const [inputedDisabilitiesQuota1, setInputedDisabilitiesQuota1] =
    React.useState("")
  const [inputedAverageSalary, setInputedAverageSalary] = React.useState("")
  const [inputedSubjects, setInputedSubjects] = React.useState("")
  const [inputedLargeFamiliesQuota1, setInputedLargeFamiliesQuota1] =
    React.useState("")
  const [inputedThreshold, setInputedThreshold] = React.useState("")
  const [inputedSpecialtyName, setInputedSpecialtyName] = React.useState("")
  const [inputedDisabilitiesQuota3, setInputedDisabilitiesQuota3] =
    React.useState("97")
  const [inputedOrphanQuota1, setInputedOrphanQuota1] = React.useState("")
  const [inputedUniversities, setInputedUniversities] = React.useState("")
  const [inputedLargeFamiliesQuota3, setInputedLargeFamiliesQuota3] =
    React.useState("")
  const [inputedAvailableGrantCount, setInputedAvailableGrantCount] =
    React.useState("")
  const [inputedDemandForSpecialty, setInputedDemandForSpecialty] =
    React.useState("")

  const handleRuralQuota1Change = (event: any) => {
    setInputedRuralQuota1(event.target.value)
  }

  const handleRuralQuota2Change = (event: any) => {
    setInputedRuralQuota2(event.target.value)
  }

  const handleRuralQuota3Change = (event: any) => {
    setInputedRuralQuota3(event.target.value)
  }

  const handleLevelChange = (event: any) => {
    setInputedLevel(event.target.value)
  }

  const handleOrphanQuota2Change = (event: any) => {
    setInputedOrphanQuota2(event.target.value)
  }

  const handleDisabilitiesQuota2Change = (event: any) => {
    setInputedDisabilitiesQuota2(event.target.value)
  }

  const handleOrphanQuota3Change = (event: any) => {
    setInputedOrphanQuota3(event.target.value)
  }

  const handleGeneralCompetition1Change = (event: any) => {
    setInputedGeneralCompetition1(event.target.value)
  }

  const handleLargeFamiliesQuota2Change = (event: any) => {
    setInputedLargeFamiliesQuota2(event.target.value)
  }

  const handleGeneralCompetition2Change = (event: any) => {
    setInputedGeneralCompetition2(event.target.value)
  }

  const handleGeneralCompetition3Change = (event: any) => {
    setInputedGeneralCompetition3(event.target.value)
  }

  const handleSpecialtyCodeChange = (event: any) => {
    setInputedSpecialtyCode(event.target.value)
  }

  const handleDisabilitiesQuota1Change = (event: any) => {
    setInputedDisabilitiesQuota1(event.target.value)
  }

  const handleAverageSalaryChange = (event: any) => {
    setInputedAverageSalary(event.target.value)
  }

  const handleSubjectsChange = (event: any) => {
    setInputedSubjects(event.target.value)
  }

  const handleLargeFamiliesQuota1Change = (event: any) => {
    setInputedLargeFamiliesQuota1(event.target.value)
  }

  const handleThresholdChange = (event: any) => {
    setInputedThreshold(event.target.value)
  }

  const handleSpecialtyNameChange = (event: any) => {
    setInputedSpecialtyName(event.target.value)
  }

  const handleDisabilitiesQuota3Change = (event: any) => {
    setInputedDisabilitiesQuota3(event.target.value)
  }

  const handleOrphanQuota1Change = (event: any) => {
    setInputedOrphanQuota1(event.target.value)
  }

  const handleUniversitiesChange = (event: any) => {
    setInputedUniversities(event.target.value)
  }

  const handleLargeFamiliesQuota3Change = (event: any) => {
    setInputedLargeFamiliesQuota3(event.target.value)
  }

  const handleAvailableGrantCountChange = (event: any) => {
    setInputedAvailableGrantCount(event.target.value)
  }

  const handleDemandForSpecialtyChange = (event: any) => {
    setInputedDemandForSpecialty(event.target.value)
  }

  const [loadingMore, setLoadingMore] = React.useState(false)
  const [inputedName, setInputedName] = React.useState("")
  const [inputedEmail, setInputedEmail] = React.useState("")
  const [inputedStatus, setInputedStatus] = React.useState("")
  const [inputedFacebook, setInputedFacebook] = React.useState("")
  const [inputedInstragam, setInputedInstragam] = React.useState("")
  const [inputedCost, setInputedCost] = React.useState("")
  const [inputedWebsite, setInputedWebsite] = React.useState("")
  const [inputedCode, setInputedCode] = React.useState("")
  const [inputedHostel, setInputedHostel] = React.useState("")
  const [inputedMilitary, setInputedMilitary] = React.useState("")
  const [inputedPhoneNumber, setInputedPhoneNumber] = React.useState(phone)
  const [inputedLogo, setInputedLogo] = React.useState("")
  const [inputedDescription, setInputedDescription] = React.useState("")
  const [inputedImages, setInputedImages] = React.useState([])
  const handleNameChange = (event: any) => {
    setInputedName(event.target.value)
  }
  const handleEmailChange = (event: any) => {
    setInputedEmail(event.target.value)
  }
  const handleStatusChange = (event: any) => {
    setInputedStatus(event)
  }
  const handleFacebookChange = (event: any) => {
    setInputedFacebook(event.target.value)
  }
  const handleInstagramChange = (event: any) => {
    setInputedInstragam(event.target.value)
  }
  const handleCostChange = (event: any) => {
    setInputedCost(event.target.value)
  }
  const handleWebsiteChange = (event: any) => {
    setInputedWebsite(event.target.value)
  }
  const handleCodeChange = (event: any) => {
    setInputedCode(event.target.value)
  }
  const handleHostelChange = (event: any) => {
    setInputedHostel(event)
  }
  const handleMilitaryChange = (event: any) => {
    setInputedMilitary(event)
  }
  const handleDescriptionChange = (event: any) => {
    setInputedDescription(JSON.stringify(event))
  }
  const handleInputedValues = () => {
    setInputedValues(!inputedValues)
  }
  const handleMainQuestion = (event: any) => {
    setInputedMainQuestion(event.target.value)
  }

  // This page
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true)
      const q = query(collection(db, "questions"), limit(8))
      const querySnapshot = await getDocs(q)
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setDocs(newDocs)
      // Configuring Data for Update:
      docs.map((item: any) => {
        setInputedMainQuestion(item.mainQuestion)
        setAnswersTag(item.answers)
        setResultslTag(item.results)
      })
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
      setLoading(false)
    }
    fetchDocs()
  }, [])

  const loadMore = async () => {
    setLoading(true)

    const q = query(collection(db, "questions"), startAfter(lastDoc), limit(8))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length === 0) {
      toast({
        title: "There is no more data in the database.",
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
            <span>Please add more data to load more!</span>
          </div>
        ),
      })
      setLoading(false)
      return
    }
    const newDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setDocs([...docs, ...newDocs])
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
    setLoading(false)
  }

  if (loading) {
    return (
      <main className="h-auto w-full px-[5%] py-5">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-center text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">
            Questions
          </span>
        </div>
        <div className="admin-panel-lists-loading place-content-center">
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <section className="min-h-screen w-full">
      <div className="relative !m-0 box-border flex h-[244px] !w-full max-w-full flex-1 flex-row items-center justify-center gap-[20px] overflow-hidden bg-gray-200 !p-0 pb-[85px] pl-[470px] pr-0 pt-[50px] mq750:box-border mq750:pb-[55px] mq750:pl-[235px] mq750:pt-8 mq450:box-border mq450:pl-5">
        <div className="relative z-0 hidden h-[248px] w-[1440px] max-w-full [background:linear-gradient(180deg,_)]" />
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="title !m-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <span className="text-sm text-primary">
            Everything you need to know about our product
          </span>
        </div>
        <img
          className="absolute left-0 top-0 z-[1] lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/left-shadow.png"
        />
        <img
          className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/center-shadow.png"
        />
        <img
          className="absolute right-0 top-0 z-[1] lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/right-shadow.png"
        />
        <img
          className="absolute left-1/3 top-0 z-[1] mx-auto size-[90%] -translate-x-1/2 object-contain lg:min-h-[300px] lg:min-w-[500px]"
          alt=""
          src="/looper-bg.png"
        />
      </div>
      <div className="faq-content mt-10 flex flex-col space-y-5">
        <div className="faq-content-buttons flex items-center justify-center space-x-7">
          <Button className="!rounded-[2.5px] !p-6" variant="outline">
            General
          </Button>
          <Button className="!rounded-[2.5px] !p-6" variant="outline">
            Calculator
          </Button>
          <Button className="!rounded-[2.5px] !p-6" variant="outline">
            Career Test
          </Button>

          {/* <div className="p-10 border rounded-[5px]">General</div> */}
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-[90%] lg:w-[700px]"
        >
          {/* {docs.map((items) => (
            <AccordionItem key={items.id} value={items.id}>
              <AccordionTrigger>
                {items.mainQuestion || "No Main Questing is Provided."}
              </AccordionTrigger>
              <AccordionContent className="!border-none">
                <div className="grid gap-4">
                  {items.answers.length > 0 ? (
                    <div className="space-y-3">
                      {items.answers.map((index: any) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {index}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="icon" variant="ghost">
                                <CheckIcon className="size-5" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          No Answers are provided.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost">
                          <CheckIcon className="size-5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))} */}
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is uSTAKING Referral Program?
            </AccordionTrigger>
            <AccordionContent>
              uSTAKING has a smart referral system to reward the activity of
              system participants. A referral reward program is integrated into
              the uSTAKING Ecosystem. It allows receiving rewards from ten
              levels deep after the referral partner has staked the amount of
              tokens.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How can I participate in the Referral Program?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Where can I check my bonus balance?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              How much can I get through uSTAKING Referral Program?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              In what type of currency can I be rewarded?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>How can I withdraw my reward?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              Which reward I can get on every level?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

export default FrameComponent
