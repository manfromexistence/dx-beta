"use client"

/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-contradicting-classname */
import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { Input as NextuiInput } from "@nextui-org/react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import FrameComponent from "@/components/signup/frame-component"
import { AspectRatio } from "@/registry/default/ui/aspect-ratio"
import { Button, buttonVariants } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import { UserAuthForm } from "../examples/authentication/components/user-auth-form"
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
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
      "blur fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
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
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
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
    className={cn("text-sm text-muted-foreground", className)}
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








const Signup: NextPage = () => {

  const { toast } = useToast()
  const router = useRouter()
  const [userDetailsDialog, setUserDetailsDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserid] = useState<any>("");
  const [surname, setSurname] = useState("");
  const [untScore, setUntScore] = useState<any>(0);
  const [region, setRegion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const EnhancedErrors = (input: any): string | null => {
    switch (input) {
      case "auth/email-already-in-use": return "Email in use.";
      case "auth/invalid-email": return "Invalid email.";
      case "auth/operation-not-allowed": return "Operation not allowed.";
      case "auth/weak-password": return "Weak password.";
      case "auth/user-disabled": return "User disabled.";
      case "auth/user-not-found": return "User not found.";
      case "auth/wrong-password": return "Wrong password.";
      case "auth/too-many-requests": return "Too many requests.";
      case "auth/network-request-failed": return "Network error.";
      default: return "Signup error.";
    }
  };

  const SuggestSolutions = (input: any): string | null => {
    switch (input) {
      case "auth/email-already-in-use": return "Try logging in or use a different email.";
      case "auth/invalid-email": return "Check format.";
      case "auth/operation-not-allowed": return "Contact support.";
      case "auth/weak-password": return "Choose a stronger one.";
      case "auth/user-disabled": return "Contact support.";
      case "auth/user-not-found": return "Check email or create new account.";
      case "auth/wrong-password": return "Try again.";
      case "auth/too-many-requests": return "Wait and try again.";
      case "auth/network-request-failed": return "Check internet connection.";
      default: return "Try again later or contact support.";
    }
  };
  const handleSignUp = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    confirmPassword === password ?
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUserid(user)
        console.log("Signup");
        setUserDetailsDialog(true)

      })
      .catch((error) => {
        setUserDetailsDialog(false)

        setUserid("Error");
        console.log("Error");

        toast({
          title: "Uh oh! Something went wrong with your SignUp.",
          description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
            <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
            <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
          </div>),
        })
      }) : toast({
        title: "Password and Confirm Password donot match!",
        description: `Please match them Password${password} & Confirm Passwrod:${confirmPassword}`,
      })

  };
  const userDetails = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const Create = await addDoc(collection(db, "users"), {
      accountType: "Client",
      email: email,
      name: name,
      userName: userName,
      region: region,
      surname: surname,
      untScore: untScore,
      userId: userId.uid
    });

    console.log("Document written with ID: ", Create.id);

    toast({
      title: "User signed up successfully!",
      description: `Continue Using Ustudy ${userName}`,
    })
    setUserDetailsDialog(false);
    router.push('/login')

  };



  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast({
          title: "User signed in successfully!",
          description: `Continue Using Ustudy ${user.uid}`,
        })
      })
      .catch((error) => {
        toast({
          title: "Uh oh! Something went wrong with your SignIn.",
          description: (<div className='flex items-start justify-start bg-primary-foreground rounded-md text-xs flex-col space-y-1.5 p-3 mt-1'>
            <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
            <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
          </div>),
        })
      });

  };
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(true)
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    React.useState(true)
  const togglePasswordVisibility = () =>
    setIsVisiblePassword(!isVisiblePassword)
  const toggleConfirmPasswordVisibility = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword)

  return (
    <div className="flex h-auto w-full flex-col-reverse items-start justify-start space-y-10 lg:mb-0 lg:h-[69vh] lg:flex-row lg:items-center lg:justify-center">
      <div className="relative mt-10 flex size-full h-auto items-center justify-center lg:m-0 lg:w-3/5 lg:rounded-sm">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/rectangle-12911.png"
            alt="Image"
            fill={true}
            className="object-cover"
          />
        </AspectRatio>
        <div className="absolute bottom-0 left-0 flex h-[30%] max-h-[150px] w-full items-center justify-center bg-purple-800 bg-opacity-0 bg-clip-padding text-3xl font-bold backdrop-blur-3xl">
          Ustudy For All
        </div>
      </div>
      <div className="flex h-auto w-full items-center justify-center lg:m-0 lg:h-full lg:flex-1">
        <div className="mx-auto grid w-4/5 min-w-[300px] max-w-[550px] gap-5">
          <div className="grid min-w-full gap-2 text-left">
            <h1 className="text-37xl font-bold">Signup</h1>
            <p className="text-balance text-muted-foreground">
              Please enter your details.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid w-full gap-2">
              <Label className="text-[#804DFE]" htmlFor="email">
                Username
              </Label>
              <Input value={userName} id="userName" placeholder="manfromexistence" required onChange={(e) => setUserName(e.target.value)} className="w-full rounded-md !border text-muted-foreground" />

            </div>

            <div className="grid w-full gap-2">
              <Label className="text-[#804DFE]" htmlFor="email">
                Email
              </Label>
              <Input value={email} id="email" type="email" placeholder="ajju40959@gmail.com" required onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md !border text-muted-foreground" />

            </div>
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
            <div className="flex w-full items-center space-x-3.5 my-1">
              <Checkbox required id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the term of services and privacy statement
              </label>
            </div>

            <Dialog open={userDetailsDialog}>
              <DialogTrigger>
                <Button
                  onClick={handleSignUp}
                  className="w-full bg-[#804DFE] text-white hover:bg-secondary"
                >
                  Signup
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="mx-auto max-w-md space-y-6">
                  <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">User Information</h1>
                    <p className="text-gray-500 dark:text-gray-400">Please fill out the form below.</p>
                  </div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input value={name} id="name" placeholder="John" required onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="surname">Surname</Label>
                        <Input value={surname} id="surname" placeholder="Doe" required onChange={(e) => setSurname(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Input value={region} id="region" placeholder="New York" required onChange={(e) => setRegion(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unt-score">UntScore</Label>
                      <Input value={untScore} id="unt-score" placeholder="85" required type="number" onChange={(e) => setUntScore(e.target.value)} />
                    </div>
                    <Button onClick={userDetails} className="w-full">
                      Submit
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="min-w-full space-x-2.5 text-center text-sm !mb-7">
            <span>Already have an account?</span>
            <Link
              href="login"
              className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text font-bold text-transparent"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
