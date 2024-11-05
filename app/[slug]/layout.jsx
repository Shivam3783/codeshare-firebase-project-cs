// // This is the root layout component for your Next.js app.
// // Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
// import { Inter } from 'next/font/google'
// import { cn } from '@/lib/utils'
// // import './globals.css'
// import './payment.globals.css' // Import the specific Tailwind CSS file


// const fontHeading = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-heading',
// })

// const fontBody = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-body',
// })

// export default function Layout({ children }) {
//   return (
//     <html lang="en">
//       <body 
//         className={cn(
//           'antialiased',
//           fontHeading.variable,
//           fontBody.variable
//         )}
//       >
//         {children}
//       </body>
//     </html>
//   )
// // }




// // This is the root layout component for your Next.js app.
// // Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
// import { Inter } from 'next/font/google'
// import { cn } from '@/lib/utils'
// import './payment.globals.css' // Import the specific Tailwind CSS file

// const fontHeading = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-heading',
// })

// const fontBody = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-body',
// })

// export default function Layout({ children }) {
//   return (
//     <html lang="en">
//       <body 
//         className={cn(
//           'antialiased',
//           fontHeading.variable,
//           fontBody.variable
//         )}
//       >
//         {children}
//       </body>
//     </html>
//   )
// }

// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './codeshare.globals.css' // Import the specific Tailwind CSS file


const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        {children}
      </body>
    </html>
      )
}