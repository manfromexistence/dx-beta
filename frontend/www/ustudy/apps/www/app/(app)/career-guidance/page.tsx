/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
"use client"

/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-contradicting-classname */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/registry/default/ui/use-toast"
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { Input as NextuiInput } from "@nextui-org/react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import FrameComponent from "@/components/signup/frame-component"
import { AspectRatio } from "@/registry/default/ui/aspect-ratio"
import { buttonVariants } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import { UserAuthForm } from "../examples/authentication/components/user-auth-form"
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { set } from 'date-fns';
import { useRouter } from 'next/navigation'
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
function uuid() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString()
}

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<any | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollTo = React.useCallback(() => {
      api?.scrollTo(0, true)
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          scrollTo,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, scrollPrev, canScrollPrev } =
    useCarousel()

  return (
    <Button
      variant="outline"
      className={cn(
        "relative",
        orientation === "horizontal"
          ? "bottom-0 left-1 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
        !canScrollPrev ? "hidden" : !canScrollNext ? "hidden" : "inline-flex"
      )}
      onClick={scrollPrev}
      {...props}
    >
      Back
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const {
    orientation,
    scrollNext,
    canScrollNext,
    scrollPrev,
    canScrollPrev,
    scrollTo,
  } = useCarousel()

  return (
    <Button
      variant={variant}
      className={cn(
        "relative",
        orientation === "horizontal"
          ? "bottom-0 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
        !canScrollPrev ? "left-0" : "left-5"
      )}
      onClick={!canScrollNext ? scrollTo : scrollNext}
      {...props}
    >
      {/* <ArrowRight className="size-4" />
      <span className="sr-only">Next slide</span> */}
      {/* {!canScrollNext ? "Click Back To Calculate Again" : "Next"} */}
      {!canScrollPrev ? "Start" : !canScrollNext ? "Calculate Again" : "Next"}

      {/* Next */}
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"



const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 blur",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// export {
//   Dialog,
//   DialogPortal,
//   DialogOverlay,
//   DialogClose,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// }









type QuestionOption = {
  a: string;
  b: string;
};

type Question = {
  [key: string]: string;
} & QuestionOption;

type QuestionsArray = Question[];


// let questions: QuestionsArray = [
//   {
//     "quiz1": "In a social gathering, do you feel more energized by interacting with a large group of people or by\r\n having one-on-one conversations?",
//     a: "Large group interactions",
//     b: "One-on-one conversations",
//   }, {
//     "quiz2": "How do you typically recharge after a busy day?",
//     a: "Spending time with friends or engaging in social activities",
//     b: "Having some alone time to relax and unwind",
//   }, {
//     "quiz3": "When facing a challenge, do you prefer brainstorming ideas with others or working through it\r\n independently?",
//     a: "Brainstorming with others",
//     b: "Working through it independently",
//   }, {
//     "quiz4": "In your free time, do you find yourself seeking out social events and gatherings or enjoying quieter\r\n activities at home?",
//     a: "Social events and gatherings",
//     b: "Quieter activities at home",
//   }, {
//     "quiz5": "How do you feel about small talk?",
//     a: "Enjoy it and find it easy to engage in",
//     b: "Find it somewhat awkward or draining",
//   }, {
//     "quiz6": "When making decisions, do you rely more on your own instincts and feelings or seek input from\r\n others?",
//     a: "Rely on own instincts and feelings",
//     b: "Seek input from others",
//   }, {
//     "quiz7": "How do you handle new and unfamiliar situations?",
//     a: "Embrace them with enthusiasm",
//     b: "Approach them with caution",
//   }, {
//     "quiz8": "In a work or team setting, do you prefer open office spaces and collaboration or individual\r\n workspaces?",
//     a: "Open office spaces and collaboration",
//     b: "Individual workspaces",
//   }, {
//     "quiz9": "How do you typically respond to being the focal point in a group setting?",
//     a: "Embrace it and feel at ease",
//     b: "Prefer to avoid being the center of attention",
//   }, {
//     "quiz10": "When planning a weekend, do you lean towards social plans with friends or quiet time for\r\n yourself?",
//     a: "Social plans with friends",
//     b: "Quiet time for yourself",
//   }, {
//     "quiz11": "When meeting new people, are you more likely to initiate conversations and introductions or wait for\r\n others to approach you?",
//     a: "Initiate conversations and introductions",
//     b: "Wait for others to approach you",
//   }, {
//     "quiz12": "When faced with a problem, do you prefer to rely on concrete facts and details or explore\r\n possibilities and potential meanings?",
//     a: "Rely on concrete facts and details",
//     b: "Explore possibilities and potential meanings",
//   }, {
//     "quiz13": "How do you approach new information or learning?",
//     a: "Prefer practical, hands-on experiences",
//     b: "Enjoy exploring theories and concepts",
//   }, {
//     "quiz14": "In a conversation, are you more focused on the present and current details or on future possibilities\r\n and patterns?",
//     a: "Present and current details",
//     b: "Future possibilities and patterns",
//   }, {
//     "quiz15": "When planning a trip, do you prefer to have a detailed itinerary and clear schedule or leave room for\r\n spontaneous experiences and changes?",
//     a: "Detailed itinerary and clear schedule",
//     b: "Leave room for spontaneous experiences and changes",
//   }, {
//     "quiz16": "How do you make decisions?",
//     a: "Based on practical considerations and real-world implications",
//     b: "Consider potential outcomes and future possibilities",
//   }, {
//     "quiz17": "When working on a project, do you tend to focus on the specific tasks at hand or the overall vision\r\n and goals?",
//     a: "Specific tasks at hand",
//     b: "Overall vision and goals",
//   }, {
//     "quiz18": "In a group discussion, do you prefer to stick to the facts and details or contribute ideas and\r\n theories?",
//     a: "Stick to facts and details",
//     b: "Contribute ideas and theories",
//   }, {
//     "quiz19": "How do you handle unexpected changes or disruptions to your plans?",
//     a: "Prefer stability and may find changes challenging",
//     b: "Adapt well to changes and enjoy the flexibility",
//   }, {
//     "quiz20": "When recalling a past event, do you focus more on the specific details and occurrences or the overall\r\n impressions and meanings?",
//     a: "Specific details and occurrences",
//     b: "Overall impressions and meanings",
//   }, {
//     "quiz21": "When reading a book or watching a movie, do you pay close attention to the plot and events or look\r\n for deeper meanings and symbolism?",
//     a: "Plot and events",
//     b: "Deeper meanings and symbolism",
//   }, {
//     "quiz22": "How do you prefer to receive information?",
//     a: "Clear and straightforward explanations",
//     b: "Rich with possibilities and potential connections",
//   }, {
//     "quiz23": "When faced with a decision, do you rely more on your past experiences and proven methods or seek out\r\n innovative and creative solutions?",
//     a: "Past experiences and proven methods",
//     b: "Innovative and creative solutions",
//   }, {
//     "quiz24": "In a brainstorming session, do you tend to come up with practical, actionable ideas or imaginative,\r\n out-of-the-box concepts?",
//     a: "Practical, actionable ideas",
//     b: "Imaginative, out-of-the-box concepts",
//   }, {
//     "quiz25": "How do you approach problem-solving?",
//     a: "Step-by-step and methodical approach",
//     b: "Approaching with creativity and openness",
//   }, {
//     "quiz26": "When making decisions, do you prioritize logical analysis and objective criteria or consider the\r\n impact on people and relationships?",
//     a: "Logical analysis and objective criteria",
//     b: "Consider the impact on people and relationships",
//   }, {
//     "quiz27": "How do you handle criticism or feedback?",
//     a: "Focus on the facts and seek constructive solutions",
//     b: "Consider the emotional aspects and how it affects relationships",
//   }, {
//     "quiz28": "When faced with a problem, do you rely more on your head and reason or your heart and\r\n empathy?",
//     a: "Head and reason",
//     b: "Heart and empathy",
//   }, {
//     "quiz29": "How do you prioritize tasks and responsibilities?",
//     a: "Based on logical importance and efficiency",
//     b: "Considering the values and impact on people",
//   }, {
//     "quiz30": "In a group decision-making process, do you tend to advocate for the most logical and rational choice\r\n or the one that aligns with personal values and harmony?",
//     a: "Logical and rational choice",
//     b: "Aligns with personal values and harmony",
//   }, {
//     "quiz31": "When giving feedback, do you focus on providing objective analysis or consider the individual's\r\n feelings and emotional response?",
//     a: "Objective analysis",
//     b: "Consider the individual's feelings and emotional response",
//   }, {
//     "quiz32": "How do you express your opinions in a debate or discussion?",
//     a: "Emphasize facts, evidence, and logical reasoning",
//     b: "Consider personal values, emotions, and the impact on people",
//   }, {
//     "quiz33": "When solving a problem, do you prioritize efficiency and effectiveness, even if it means being blunt,\r\n or do you consider the feelings of those involved?",
//     a: "Prioritize efficiency and effectiveness",
//     b: "Consider the feelings of those involved",
//   }, {
//     "quiz34": "In a work environment, do you value objective performance metrics and results or prioritize a\r\n positive and supportive team culture?",
//     a: "Objective performance metrics and results",
//     b: "Positive and supportive team culture",
//   }, {
//     "quiz35": "How do you approach conflict resolution?",
//     a: "Focus on finding logical solutions and compromises",
//     b: "Consider the emotional needs and harmony of individuals involved",
//   }, {
//     "quiz36": "When planning an event or project, do you prioritize the logical steps and timeline or consider the\r\n emotional atmosphere and team dynamics?",
//     a: "Logical steps and timeline",
//     b: "Emotional atmosphere and team dynamics",
//   }, {
//     "quiz37": "How do you cope with stress or pressure?",
//     a: "Analyze the situation logically and strategize a plan",
//     b: "Seek emotional support and consider the impact on relationships",
//   }, {
//     "quiz38": "When making decisions, what holds more weight for you?",
//     a: "Objective data and analysis",
//     b: "Personal values and the impact on people",
//   }, {
//     "quiz39": "When providing feedback, do you prioritize offering constructive criticism and improvement\r\n suggestions or highlighting positive aspects and encouraging the individual?",
//     a: "Constructive criticism and improvement suggestions",
//     b: "Highlighting positive aspects and encouraging the individual",
//   }, {
//     "quiz40": "How do you feel about making plans and sticking to a schedule?",
//     a: "Enjoy making plans and prefer a structured schedule",
//     b: "Prefer flexibility and spontaneity, dislike strict schedules",
//   }, {
//     "quiz41": "When starting a project, do you prefer to have a detailed plan in place or do you like to explore\r\n possibilities and figure it out as you go?",
//     a: "Prefer to have a detailed plan",
//     b: "Like to explore possibilities and figure it out as you go",
//   }, {
//     "quiz42": "How do you approach deadlines?",
//     a: "Work diligently to meet deadlines well in advance",
//     b: "Tend to work better under pressure and close to the deadline",
//   }, {
//     "quiz43": "In a work setting, do you prefer a clear and organized workspace or are you comfortable with a more\r\n flexible and adaptable environment?",
//     a: "Prefer a clear and organized workspace",
//     b: "Comfortable with a more flexible and adaptable environment",
//   }, {
//     "quiz44": "When packing for a trip, do you plan and make a checklist in advance or pack on the fly, throwing in\r\n what feels right at the moment?",
//     a: "Plan and make a checklist in advance",
//     b: "Pack on the fly, throwing in what feels right",
//   }, {
//     "quiz45": "What do you do when your plans suddenly change?",
//     a: "Dislike unexpected changes and prefer to stick to the original plan",
//     b: "Adapt well to unexpected changes and enjoy the flexibility",
//   }, {
//     "quiz46": "When faced with a new opportunity, do you prefer to consider the advantages and disadvantages prior\r\n to making a decision or go with the flow and see where it takes you ?",
//     a: "Consider the advantages and disadvantages prior to deciding",
//     b: "Go with the flow and see where it takes you",
//   }, {
//     "quiz47": "How do you approach work tasks?",
//     a: "Like to have a set plan and follow it step by step",
//     b: "Enjoy being flexible and adapting as the situation evolves",
//   }, {
//     "quiz48": "When organizing your day, do you prefer to have a to-do list with specific tasks and deadlines or\r\n keep it open-ended and see where the day takes you?",
//     a: "To-do list with specific tasks and deadlines",
//     b: "Keep it open-ended and see where the day takes you",
//   }, {
//     "quiz49": "How do you feel about routine and predictability?",
//     a: "Prefer routine and find comfort in predictability",
//     b: "Dislike routine and enjoy spontaneity",
//   }, {
//     "quiz50": "In a decision-making process, do you like to reach a conclusion and move on or prefer to keep options\r\n open and gather more information?",
//     a: "Like to reach a conclusion and move on",
//     b: "Prefer to keep options open and gather more information",
//   }
// ]


// let FormSchema = z.object({});

// for (let i = 0; i < questions.length; i++) {
//   FormSchema = FormSchema.extend({
//     [`quiz${i + 1}`]: z.enum(["a", "b"], {
//       required_error: "You need to select an answer.",
//     }),
//   });
// }

// console.log(FormSchema);



type QuizFormFields = {
  mainQuestion: string;
  answers: string[];
  results: string[];
};

// let FormSchema = z.object({});

// for (let i = 0; i < questions.length; i++) {
//   FormSchema = FormSchema.extend({
//     [`quiz${i + 1}`]: z.enum(["a", "b"], {
//       required_error: "You need to select an answer.",
//     }),
//   });
// }

// console.log(FormSchema);

/**
{
  mainQuestion: "The Main Question",
  answers: [
    "ansewer1",
    "ansewer2",
    "ansewer3",
  ]
  resultss: [
    "results1",
    "results2",
    "results3",
  ]
}


 */








import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

function QuizResult() {
  return (
    <Card className="mx-auto mt-32 w-full max-w-md bg-[#804DFE] text-white">
      <CardHeader className="border-b border-white border-opacity-25 p-4">
        <div className="flex items-center space-x-2">
          <JapaneseYenIcon className="size-6" />
          <CardTitle>Result</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p>Close types: intellectual and office.</p>
        <p>The opposite type is social.</p>
        <div className="mt-4">
          <CardTitle>Proclivities</CardTitle>
          <ul className="list-disc pl-5">
            <li>emitted by a smart contract. Maximum emission: 2 billion U</li>
            <li>1.25% (25 m) of the token emission will be allocated to create liquidity on the exchange</li>
            <li>The initial price after the token listing on the exchange 0.10 USD</li>
            <li>According to the schedule, in the first few years the token will reach x100; x500 or more</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function JapaneseYenIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 9.5V21m0-11.5L6 3m6 6.5L18 3" />
      <path d="M6 15h12" />
      <path d="M6 11h12" />
    </svg>
  )
}


export default function RadioGroupForm() {

  const [docs, setDocs] = React.useState<any>([])
  const [data, setData] = React.useState<any>([])

  // let array = Array.from({length: 30}, (_, i) => ({[i+1]: `answer${i+1}`}));

  // let obj = Object.assign({}, ...array);

  // setData(obj);


  let FormSchema = z.object({});


  for (let i = 0; i < docs?.length; i++) {
    FormSchema = FormSchema.extend({
      [`${i + 1}`]: z.string(),
    });
  }

  const form = useForm<any>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // e.preventDefault();
    setData(data);
    toast({
      title: "Thank you, for taking quiz.",
      description: (
        <pre className="mt-2 max-h-[500px] w-[340px] !select-all overflow-y-auto overflow-x-hidden rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          {/* The Reults will appear shortly. */}
        </pre>
      ),
    })
    scrollNext();

  }

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState<any>(0)
  const [count, setCount] = React.useState<any>(0)
  const { toast } = useToast()



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

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollTo = React.useCallback(() => {
    api?.scrollTo(0, true)
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])



  useEffect(() => {
    const fetchDocs = async () => {
      const q = query(collection(db, "questions"))
      const querySnapshot = await getDocs(q)
      const newDocs: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setDocs(newDocs)
    }
    fetchDocs()
  }, [])









  // Create a frequency object
  let frequency: any = {};

  // Map through docs array
  const results: any = docs.map((doc: any, index: any) => {
    // Check what answers matches with index with docs and data array
    const answerIndex = doc.answers.indexOf(data[index + 1]);
    if (answerIndex !== -1) {
      const result: any = doc.results[answerIndex];
      // Increase the count in the frequency object
      frequency[result] = (frequency[result] || 0) + 1;
      return result;
    }
  });

  // Convert the frequency object to an array and sort it by count
  const sortedFrequency: any = Object.entries(frequency).sort((a: any, b: any) => b[1] - a[1]);

  // Get the top 3 results
  const topResults: any = sortedFrequency.slice(0, 3);








  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="z-50 flex max-h-[65vh] w-full flex-col items-start justify-start space-y-5 overflow-y-auto overflow-x-hidden p-9 pt-3">
              <h1 className="title mx-auto bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Career & Guidence</h1>
              <div className="admin-panel-lists mx-auto w-full">
                {docs && docs.map((question: any, index: any) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`${index + 1}`}
                    render={({ field }) => (
                      <FormItem className="hover:bg-primary-foreground relative flex size-full min-h-[165px] flex-col space-y-3 rounded-md border p-5">
                        <div className="flex flex-row items-center justify-start space-x-1.5 !p-0 text-[1rem] font-bold">
                          <span className="center bg-primary-foreground min-h-[35px] min-w-[35px] rounded-full border">{index + 1}</span>
                          <span className="text-start text-xs">{question.mainQuestion}</span>
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1 px-2"
                          >
                            {question.answers?.map((a: any) => <FormItem key={a} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={a} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {a}
                              </FormLabel>
                            </FormItem>)}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <Button type="submit" className="mx-auto w-[100%] py-6">Submit</Button>
            </form>
          </Form>
        </CarouselItem>

        <CarouselItem>
          <Card className="mx-auto my-24 w-full max-w-md bg-[#804DFE] text-white">
            <CardHeader className="border-b border-white border-opacity-25 p-4">
              <div className="flex items-center space-x-2">
                <JapaneseYenIcon className="size-6" />
                <CardTitle>Result</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {/* {
                docs && docs.map((item: any) =>
                  item.answers.map((answer: any, index: number) => {
                    // Check if data is available and if the answer exists in the data
                    if (data && Object.values(data).includes(answer)) {
                      let result = item.results[index];
                      // Check if the result exists
                      if (result) {
                        return (
                          <div className="my-3 w-fit rounded-md bg-green-400 p-1.5 text-center text-xs text-white" key={result}>
                            {result}
                          </div>
                        );
                      }
                    }
                    // If data is not available or the answer does not exist in the data, or if the result does not exist, return null
                    return null;
                  })
                )
              } */}

              {/* {results.map((result:any, index:any) => (
                <p key={index}>{result}</p>
              ))} */}
              {/* <h2>Top 3 Results</h2> */}
              {topResults.map(([result, count]: [any, any], index: any) => (
                // <p key={index}>
                //   {index + 1}. {result} - {count}
                // </p>
                <div key={index} className="my-3 w-fit rounded-md bg-green-400 p-1.5 text-center text-xs text-white">
                  {result} ({count})
                </div>




              ))}

              <p>Close types: intellectual and office.</p>
              <p>The opposite type is social.</p>
              <div className="mt-4">
                <CardTitle>Proclivities</CardTitle>
                <ul className="list-disc pl-5">
                  <li>emitted by a smart contract. Maximum emission: 2 billion U</li>
                  <li>1.25% (25 m) of the token emission will be allocated to create liquidity on the exchange</li>
                  <li>The initial price after the token listing on the exchange 0.10 USD</li>
                  <li>According to the schedule, in the first few years the token will reach x100; x500 or more</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>

        {/*
 in react typescript there is two arrays.
 First array = docs=[
  {
    mainQuestion:"The mainQuestion",
    answers:["answer1,"answer2"]
    results:["result1,"result2"]
  }
  ...]
  Second Object Array => data=[
    "1": "anwers1"
    "2": "anwers2"
  ]
  Now map through docs array and check what answers matches with index with docs and data array and return the content of the matched answers index of resutl index
  There will 5 items means 0 to 4 items
here are the results 1. Medical Researcher 2.Software Developer 3.Structural Engineer 4.Legal Advisor please do this inside of a already returned reaact component like inside a div element
  now look among all of the data which are most in count.
  Rank those and return top 3 and how many they count.

        <CarouselItem>
          <div className="mx-auto grid w-4/5 min-w-[300px] max-w-[550px] gap-5">
            <div className="grid min-w-full gap-2 text-left">
              <h1 className="text-37xl font-bold">Recover password</h1>
              <p className="text-balance text-muted-foreground">
                Please enter your details
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-[#804DFE]" htmlFor="password">
                    Password
                  </Label>
                </div>
                <div className="w-full relative">
                  <Input
                    required
                    value={password}
                    type={isVisiblePassword ? "text" : "password"}
                    id="password"
                    placeholder="YourPassword123"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md !border text-muted-foreground"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                  >
                    {isVisiblePassword ? (
                      <Eye className="hover:text-[#804DFE]" />
                    ) : (
                      <EyeOff className="hover:text-[#804DFE]" />
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-[#804DFE]" htmlFor="password">
                    Confirm Password
                  </Label>
                </div>
                <div className="w-full relative">
                  <Input
                    required
                    value={confirmPassword}
                    type={isVisibleConfirmPassword ? "text" : "password"}
                    id="password"
                    placeholder="YourPassword123"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={cn("w-full rounded-md !border text-muted-foreground",
                      confirmPassword === password ? "text-green-400" : "text-pink-500"
                    )}
                  />
                  <div
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3.5 top-1/2 translate-y-[-50%]"
                  >
                    {isVisibleConfirmPassword ? (
                      <Eye className="hover:text-[#804DFE]" />
                    ) : (
                      <EyeOff className="hover:text-[#804DFE]" />
                    )}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#804DFE] !py-6 text-white hover:bg-secondary"
                onClick={scrollNext}
              >
                Done
              </Button>
            </div>

          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="mx-auto grid w-4/5 min-w-[300px] max-w-[550px] gap-5">
            <h1 className="text-center text-26xl font-bold">
              Congratulations, you’ve changed the password
            </h1>
            <div className="mt-3 flex w-full items-center justify-center">
              <Link href="/login">
                <Button
                  variant={"outline"}
                  type="submit"
                  className="mx-auto w-64"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </CarouselItem> */}

      </CarouselContent>
    </Carousel>
  )
}
