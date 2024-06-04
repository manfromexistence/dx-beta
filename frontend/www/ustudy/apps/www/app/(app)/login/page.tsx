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
import React, { useEffect, useState } from 'react';
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





const Login: NextPage = () => {

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
  const [docs, setDocs] = useState<any>([]);
  useEffect(() => {
    const fetchDocs = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(newDocs);
    };
    fetchDocs();
  }, []);

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
  // const handleSignUp = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   confirmPassword === password ?
  //     createUserWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         // Signed up
  //         const user = userCredential.user;
  //         setUserid(user)
  //         console.log("Signup");
  //         setUserDetailsDialog(true)

  //       })
  //       .catch((error) => {
  //         setUserDetailsDialog(false)

  //         setUserid("Error");
  //         console.log("Error");

  //         toast({
  //           title: "Uh oh! Something went wrong with your SignUp.",
  //           description: (<div className='bg-primary-foreground mt-1 flex flex-col items-start justify-start space-y-1.5 rounded-md p-3 text-xs'>
  //             <span className="text-muted-foreground">{`Error: ${EnhancedErrors(error.code)}`}</span>
  //             <span className="text-muted-foreground">{`Possible Solution: ${SuggestSolutions(error.code)}`}</span>
  //           </div>),
  //         })
  //       }) : toast({
  //         title: "Password and Confirm Password donot match!",
  //         description: `Please match them Password${password} & Confirm Passwrod:${confirmPassword}`,
  //       })

  // };
  // const userDetails = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   const Create = await addDoc(collection(db, "users"), {
  //     accountType: "Client",
  //     email: email,
  //     name: name,
  //     userName: userName,
  //     region: region,
  //     surname: surname,
  //     untScore: untScore,
  //     userId: userId.uid
  //   });

  //   console.log("Document written with ID: ", Create.id);

  //   toast({
  //     title: "User signed up successfully!",
  //     description: `Continue Using Ustudy ${userId.uid}`,
  //   })
  //   setUserDetailsDialog(false);
  //   router.push('/login')

  // };



  const handleSignIn = async (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        docs.map((users: any) => {
          // if (users.acccountType === "Client") {
          //   user.uid === users.userId && toast({
          //     title: "This is a user account!",
          //     description: `Please be carefull to the database. Any suspicius activity will lead to Account Ban.Signed User ${users.name}`,
          //   })
          // }
          user.uid === users.userId && toast({
            title: "User signed in successfully!",
            description: `Continue Using Ustudy ${users.userName}`,
          })
          // if (users.accountType === "Admin") {
          //   user.uid === users.userId && toast({
          //     title: "Admin signed in successfully!",
          //     description: `Continue Using Ustudy ${users.name}`,
          //   })
          //   router.push('/universities')
          // }

        })

        router.push('/calculator')
      })
      .catch((error) => {
        toast({
          title: "Uh oh! Something went wrong with your SignIn.",
          description: (<div className='bg-primary-foreground mt-1 flex flex-col items-start justify-start space-y-1.5 rounded-md p-3 text-xs'>
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
    <div className="flex h-auto w-full flex-col-reverse items-start justify-start space-y-10 lg:mb-0 lg:h-[69vh] lg:flex-row lg:items-start lg:items-center lg:justify-start lg:justify-center">
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
            <h1 className="text-37xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground text-balance">
              Please enter your details
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid w-full gap-2">
              <Label className="text-[#804DFE]" htmlFor="email">
                Email or Username
              </Label>
              <Input value={email} id="email" type="email" placeholder="ajju40959@gmail.com" required onChange={(e) => setEmail(e.target.value)} className="text-muted-foreground w-full rounded-md !border" />

            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className="text-[#804DFE]" htmlFor="password">
                  Password
                </Label>
              </div>
              <div className="relative w-full">
                <Input
                  required
                  value={password}
                  type={isVisiblePassword ? "text" : "password"}
                  id="password"
                  placeholder="YourPassword123"
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-muted-foreground w-full rounded-md !border"
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
            <Link
              href="/forgot-password"
              className="flex w-full items-end justify-end text-sm underline"
            >
              Forgot your password?
            </Link>
            <Button
              onClick={handleSignIn}
              className="hover:bg-secondary w-full bg-[#804DFE] text-white"
            >
              Login
            </Button>
          </div>
          <div className="mt-4 min-w-full space-x-1 text-center text-sm">
            <span>Don't have an account?</span>
            <Link
              href="signup"
              className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text font-bold text-transparent"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
