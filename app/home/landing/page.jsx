'use client';

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import ProtectedRoute from "@/components/ProtectedRoute";


export default function Landing() {
  return (
    (
      <ProtectedRoute>

    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <CodeIcon className="h-6 w-6" />
          <span className="sr-only">Codeshare.io Alternative</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Testimonials
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div
              className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Collaborative Coding Made Easy
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Codeshare.io Alternative is a powerful collaborative code editor that lets you work together in
                    real-time, with built-in features like a timer, file downloads, and automatic text deletion.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/try"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}>
                    Try it Now
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}>
                    Learn More
                  </Link>
                </div>
              </div>

              <Image
                src="/first.jpg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square" />
              {/* <img
                src="/first.jpg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square" /> */}
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div
              className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Collaborative Coding
                </h2>
                <p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Codeshare.io Alternative offers a suite of powerful features to enhance your collaborative coding
                  experience.
                </p>
              </div>
            </div>
            <div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {/* <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Real-time Collaboration</h3>
                      <p className="text-muted-foreground">
                        Work together on the same code in real-time, with instant updates and no delays.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Built-in Timer</h3>
                      <p className="text-muted-foreground">
                        Stay on track with the integrated timer, which automatically deletes the code after 1 hour.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">File Downloads</h3>
                      <p className="text-muted-foreground">
                        Download your collaborative code in various programming languages, including JavaScript, Python,
                        and more.
                      </p>
                    </div>
                  </li>
                </ul>
              </div> */}

              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <div className="flex items-center gap-4">
                    <TimerIcon className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">Automatic Timer</h3>
                      <p className="text-muted-foreground">
                        Never lose track of time with our built-in timer that automatically tracks your work.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-4">
                    <DownloadIcon className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">Seamless Downloads</h3>
                      <p className="text-muted-foreground">
                        Easily download your work in a variety of formats, including PDF, Word, and more.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-4">
                    <TrashIcon className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">Auto Text Deletion</h3>
                      <p className="text-muted-foreground">
                        Protect your work by automatically deleting text after a set period of time, ensuring your
                        content stays secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Image
                src="/vscode_editor_opened_some_code_is_written_like_taht.jpeg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last" />

              {/* <img
                src="/vscode_editor_opened_some_code_is_written_like_taht.jpeg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last" /> */}
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div
            className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
              <p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from developers who have used Codeshare.io Alternative to streamline their collaborative coding
                workflows.
              </p>
            </div>
            <div className="divide-y rounded-lg border">
              <div
                className="grid w-full grid-cols-1 items-stretch justify-center divide-y md:grid-cols-2 lg:grid-cols-3">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Card className="w-full">
                    <CardContent>
                      <div className="flex flex-col items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="text-center space-y-1">
                          <h4 className="font-bold">John Doe</h4>
                          <p className="text-muted-foreground text-sm">Software Engineer</p>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          "Codeshare.io Alternative has been a game-changer for\n our team. The real-time collaboration
                          and built-in\n features make our coding sessions so much more\n efficient."
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Card className="w-full">
                    <CardContent>
                      <div className="flex flex-col items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                          <AvatarFallback>JA</AvatarFallback>
                        </Avatar>
                        <div className="text-center space-y-1">
                          <h4 className="font-bold">Jane Appleseed</h4>
                          <p className="text-muted-foreground text-sm">Product Manager</p>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          "I love how Codeshare.io Alternative makes it easy for\n my team to collaborate on code
                          projects. The automatic\n text deletion feature is a lifesaver!"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <Card className="w-full">
                    <CardContent>
                      <div className="flex flex-col items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <div className="text-center space-y-1">
                          <h4 className="font-bold">Sarah Musk</h4>
                          <p className="text-muted-foreground text-sm">Engineering Manager</p>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          "Codeshare.io Alternative has streamlined our\n collaborative coding workflow. The ability to
                          download\n files in various languages is a huge time-saver."
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div
            className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing</h2>
              <p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that best fits your team's needs.
              </p>
            </div>
            <div
              className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>For individuals and small teams.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold">$0</p>
                    <p className="text-muted-foreground">per month</p>
                  </div>
                  <Separator className="my-6" />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      Real-time Collaboration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      Built-in Timer
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      File Downloads
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      1 Active Session
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button>Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                  <CardDescription>For small to medium-sized teams.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold">$9</p>
                    <p className="text-muted-foreground">per user/month</p>
                  </div>
                  <Separator className="my-6" />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      Real-time Collaboration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      Built-in Timer
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      File Downloads
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      Unlimited Active Sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      Team Management
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button>Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large teams and organizations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold">Custom</p>
                    <p className="text-muted-foreground">Pricing</p>
                  </div>
                  <Separator className="my-6" />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      Real-time Collaboration
                    </li>
                    <li className="flex items-center gap-" />
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Collaborative Editor. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
    </ProtectedRoute>
    )
  );
}

function CheckIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>)
  );
}


function CodeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>)
  );
}



function TimerIcon(props) {
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
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  )
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}
