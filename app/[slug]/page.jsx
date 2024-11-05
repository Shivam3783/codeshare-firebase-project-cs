'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from "react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ProtectedRoute from '@/components/ProtectedRoute';


export default function SlugPage() {

  // const router = useRouter(); // Initialize useRouter
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  // const [user, setUser] = useState(null);


  const params = useParams();
  const slug = params.slug; // Retrieve the dynamic part of the URL
  const TIMER_SECONDS = 3600;
  const [showCopyIcon, setShowCopyIcon] = useState(false)
  const [textSize, setTextSize] = useState(14)
  const [text, setText] = useState('')
  const [time, setTime] = useState(TIMER_SECONDS); // 1 hour in seconds


  // useEffect(() => {
  //   // Check user authentication status on component mount
  //   const checkAuthentication = async () => {
  //     try {
  //       const response = await fetch('/api/user');
  //       const user = await response.json();
  //       // console.log('response:',response);
  //       setUser(user);

  //       console.log('user',user);
        
  //       if (response.ok && user.isAuthenticated) {
  //         setIsAuthenticated(true);
  //         // router.push(`/${slug}`); // Redirect to home if not authenticated

  //       } else {
  //         router.replace('/'); // Redirect to home if not authenticated
  //       }
  //     } catch (error) {
  //       console.error('Error checking authentication:', error);
  //       router.replace('/'); // Redirect to home on error
  //     }
  //   };

  //   checkAuthentication();
  // }, [router]);


  // const handleLogout = () => {
  //   window.location.href = '/api/appid/logout';
  // };





  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          setText(''); // Clear text when timer finishes
          return TIMER_SECONDS; // Reset time to 1 hour (3600 seconds)
        }
        return prevTime - 1;
      });
    }, 1000); // decrement time every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8); // format time as HH:MM:SS

  useEffect(() => {
    // Fetch the text from the server when the component mounts
    const fetchText = async () => {
      try {
        const response = await fetch(`/api/get/${slug}`);
        const data = await response.json();
        if (data.text) {
          setText(data.text);
        }
      } catch (error) {
        console.error('Error fetching text:', error);
      }
    };

    fetchText();
  }, [slug]);

  const handleTextChange = async (e) => {
    setText(e.target.value);

    // Save the text to the server
    try {
      await fetch(`/api/save/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: e.target.value }),
      });
    } catch (error) {
      console.error('Error saving text:', error);
    }
  }

  const lineNumbers = text.split('\n').map((_, index) => index + 1).join('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setShowCopyIcon(true)
    setTimeout(() => {
      setShowCopyIcon(false)
    }, 2000)
  }

  const handleZoomIn = () => {
    setTextSize(textSize + 2)
  }
  const handleZoomOut = () => {
    setTextSize(textSize - 2)
  }


  const handleDownload = (fileType) => {
    const filenameInput = document.querySelector('.filename');
    let filename = filenameInput.value.trim();

    if (!filename) {
      filename = `text.${fileType}`;
    } else if (!filename.endsWith(`.${fileType}`)) {
      filename = `${filename}.${fileType}`;
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const handleAIResponse = async () => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: text }),
      });

      const data = await response.json();
      if (data.aiResponse) {
        setText((prevText) => prevText + '\n' + data.aiResponse);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
  };

    // // Only render the editor if authenticated
    // if (!isAuthenticated) {
    //   return <div>Unauthenticated ...</div>; // Or some loading state
    // }




  return (
    (<ProtectedRoute>
    <div className="flex flex-col h-screen">
    
      <header
        className="bg-muted text-muted-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <FilePenIcon className="w-6 h-6" />
            <span className="text-xl font-bold">Collaborative Editor</span>
            {/* <span>/{user?.user?.name}</span> */}
            <span>/</span>
            <input
              type="text"
              className="bg-muted text-muted-foreground px-2 py-1 rounded-md focus:outline-none filename"
              placeholder="Enter file name"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="text-muted-foreground font-medium" >1:00:00</div> */}
          <div className="text-muted-foreground font-medium" > {formattedTime} </div>
          <Button variant="ghost" size="icon" onClick={handleAIResponse}>
            <SparkleIcon className="h-5 w-5 text-green-500" />
            <span className="sr-only" >Format document </span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleZoomIn}>
            <ZoomInIcon className="w-5 h-5" />
            <span className="sr-only">Zoom in</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleZoomOut}>
            <ZoomOutIcon className="w-5 h-5" />
            <span className="sr-only">Zoom out</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <DownloadIcon className="w-5 h-5" />
                <span className="sr-only">Download</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleDownload('txt')}>
                <FileTextIcon className="w-4 h-4" />
                Download as .txt
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleDownload('cpp')}>
                <FileCodeIcon className="w-4 h-4" />
                Download as .cpp
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleDownload('py')}>
                <FileCodeIcon className="w-4 h-4" />
                Download as .py
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleDownload('java')}>
                <FileCodeIcon className="w-4 h-4" />
                Download as .java
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleDownload('js')}>
                <FileIcon className="w-4 h-4" />
                Download as .js
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button variant="ghost" size="icon" className="rounded-full">
            <ShareIcon className="w-5 h-5" />
            <span className="sr-only">Share</span>
          </Button> */}
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleCopy}>
            {showCopyIcon ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
            <span className="sr-only">Copy</span>
          </Button>
          {/* <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 mt-4 rounded">
            Logout
          </button> */}
        </div>
      </header>


      <div className="flex-1 overflow-auto p-4">
        <div className="flex">
          <div className="pr-4 text-right text-gray-500 numbers" style={{ fontSize: `${textSize}px`, paddingTop: '5px' }} >
            <pre>{lineNumbers}</pre>
          </div>
          <div className="flex-1">
            <Textarea
              className="w-full h-full resize-none bg-black text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary typing"
              style={{ fontSize: `${textSize}px`, paddingTop: '8px', }}
              value={text}
              onChange={handleTextChange}
              placeholder="Start typing..."
            />
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>)
  );
}

function SparkleIcon(props) {
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
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
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


function CopyIcon(props) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>)
  );
}


function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>)
  );
}


function FileCodeIcon(props) {
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
      <path d="M10 12.5 8 15l2 2.5" />
      <path d="m14 12.5 2 2.5-2 2.5" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
    </svg>)
  );
}


function FileIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>)
  );
}


function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>)
  );
}


function FileTextIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>)
  );
}


// function ShareIcon(props) {
//   return (
//     (<svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round">
//       <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
//       <polyline points="16 6 12 2 8 6" />
//       <line x1="12" x2="12" y1="2" y2="15" />
//     </svg>)
//   );
// }



function ZoomInIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="11" x2="11" y1="8" y2="14" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  )
}


function ZoomOutIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
      <line x1="8" x2="14" y1="11" y2="11" />
    </svg>
  )
}