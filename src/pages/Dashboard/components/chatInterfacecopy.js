// import { useState, useRef, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { User, Bot, Copy, Send, FileText } from 'lucide-react';
// import useToast from '../../../hooks/useToast';
// import axiosInstance from '../../../axiosInstance';
// import localInstance from '../../../localInstance';


// export default function ChatInterface({ selectedProject }) {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const messagesEndRef = useRef(null);
//   const { showToast } = useToast();
//   const user = localStorage.getItem('user');
//   const userData = JSON.parse(user);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);



//   const handleCopyMessage = (content) => {
//     navigator.clipboard.writeText(content);
//     showToast('Copied to clipboard!');
//   };

//   const handleSendMessage = async () => {
//     console.log("handlesendmssage called....");
//     if (inputMessage.trim() && selectedProject?.id) {
//       const userMessage = {
//         id: Date.now().toString(),
//         content: inputMessage,
//         role: 'user',
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, userMessage]);
//       setInputMessage('');
//       try {
//         const payload = {
//           project_id: selectedProject.id,
//           // agent_type: userData.role,
//           message: userMessage.content,
//         };
//         // const response = await axiosInstance.post('/conversations', payload);
//         const response = await localInstance.post('/chat', payload);
//         const data = response.data;
//         console.log("chat data....",data);
//         // const botMessage = {
//         //   id: data.id,
//         //   content: data.response,
//         //   role: data.agent_type,
//         //   timestamp: new Date(data.created_at),
//         // };
//         const botMessage = {
//           id: data.project_id,
//           content: data.content,
//           role: "user",
//           timestamp: new Date(),
//         };
//         setMessages((prev) => [...prev, botMessage]);
//       } catch (error) {
//         showToast('Failed to send message', { type: 'error' });
//       }
//     }
//   };

//   const generateSampleDocuments = () => {
//     return [
//       {
//         id: Date.now().toString(),
//         name: `${selectedProject?.name}-summary.docx`,
//         type: 'docx',
//         content: `Summary document for ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 1).toString(),
//         name: `${selectedProject?.name}-notes.txt`,
//         type: 'txt',
//         content: `Notes about ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 2).toString(),
//         name: `${selectedProject?.name}-presentation.pptx`,
//         type: 'ppt',
//         content: `Presentation for ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 3).toString(),
//         name: `${selectedProject?.name}-report.pdf`,
//         type: 'pdf',
//         content: `Report for ${selectedProject?.name}`
//       }
//     ];
//   };

//   const getFileIcon = (type) => {
//     switch(type) {
//       case 'pdf': return <FileText className="h-4 w-4 mr-2 text-red-500" />;
//       case 'docx': return <FileText className="h-4 w-4 mr-2 text-blue-500" />;
//       case 'ppt': return <FileText className="h-4 w-4 mr-2 text-orange-500" />;
//       default: return <FileText className="h-4 w-4 mr-2 text-gray-500" />;
//     }
//   };

//   const fetchChatHistory = async () => {
//     if (selectedProject?.id) {
//       try {
//         // const response = await axiosInstance.get(`/conversations/${selectedProject.id}`);
//         const response = await localInstance.get(`/conversation/${selectedProject.id}`);
//         const data = response.data;
//         setMessages(data);
//       } catch (error) {
//         showToast('Failed to fetch chat history', { type: 'error' });
//       }
//     }
//   };

//   useEffect(() => {
//     fetchChatHistory();
//  },[selectedProject]);

//   return (
//     <Box display="flex" flexDirection="column" flex={1} height="100%" sx={{ background: 'none' }}>
//       <Box flex={1} overflow="auto" p={2}>
//         {messages.length === 0 ? (
//           <Box display="flex" alignItems="center" justifyContent="center" height="100%">
//             <Box
//               textAlign="center"
//               maxWidth={400}
//               sx={{
//                 border: '1.5px solid #e0e0e0',
//                 borderRadius: 2,
//                 background: 'rgba(245,248,250,0.5)',
//                 color: '#b0b3c6',
//                 fontWeight: 400,
//                 fontSize: 18,
//                 p: 4,
//                 boxShadow: 0,
//                 mx: 'auto',
//               }}
//             >
//               <Box fontWeight={600} fontSize={20} mb={1} color="#b0b3c6">
//                 Start chatting about {selectedProject?.name || 'your project'}
//               </Box>
//               <Box color="#b0b3c6" fontSize={15}>
//                 Send a message to begin your conversation about this project.
//               </Box>
//             </Box>
//           </Box>
//         ) : (
//           messages.map((message) => (
//             <Box key={message.id} display="flex" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
//               <Box
//                 maxWidth={600}
//                 borderRadius={3}
//                 p={2}
//                 sx={{
//                   background: '#f3f0fa',
//                   color: '#8134af',
//                   border: '1.5px solid #ececec',
//                   boxShadow: 1,
//                   fontFamily: 'Segoe UI, sans-serif',
//                   fontSize: 16,
//                 }}
//               >
//                 <Box display="flex" alignItems="center" mb={1}>
//                   {message.role === 'user' ? (
//                     <User style={{ height: 16, width: 16, marginRight: 8, color: '#8134af' }} />
//                   ) : (
//                     <Bot style={{ height: 16, width: 16, marginRight: 8, color: '#8134af' }} />
//                   )}
//                   <Box fontSize={12} fontWeight="fontWeightMedium" color="#8134af">
//                     {message.role === 'user' ? 'You' : 'Assistant'}
//                   </Box>
//                   <Box fontSize={12} ml={2} color="#8134af">
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </Box>
//                   {message.role === 'assistant' && (
//                     <Button 
//                       onClick={() => handleCopyMessage(message.content)}
//                       size="small"
//                       sx={{ minWidth: 0, ml: 1, color: '#8134af' }}
//                       title="Copy message"
//                     >
//                       <Copy style={{ height: 16, width: 16 }} />
//                     </Button>
//                   )}
//                 </Box>
//                 <Box>{message.content}</Box>
//               </Box>
//             </Box>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </Box>
//       <Box borderTop={1} borderColor="#e0e0e0" p={2} display="flex" gap={2} alignItems="center" sx={{ background: 'rgba(255,255,255,0.95)' }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder={`Message about ${selectedProject?.name}...`}
//           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//           InputProps={{
//             style: {
//               background: '#fbeee6',
//               borderRadius: 8,
//               fontFamily: 'Segoe UI, sans-serif',
//             },
//           }}
//         />
//         <Button
//           variant="contained"
//           onClick={handleSendMessage}
//           disabled={!inputMessage.trim() || !selectedProject?.name}
//           sx={{
//             background: 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
//             color: '#fff',
//             fontWeight: 600,
//             borderRadius: 2,
//             boxShadow: '0 2px 8px 0 rgba(221, 42, 123, 0.10)',
//             fontSize: 18,
//             letterSpacing: 1,
//             minWidth: 48,
//             minHeight: 48,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             '&:hover': {
//               background: 'linear-gradient(90deg, #515bd4 0%, #8134af 30%, #dd2a7b 70%, #f58529 100%)',
//             },
//           }}
//         >
//           <Send style={{ height: 24, width: 24 }} />
//         </Button>
//       </Box>
//     </Box>
//   );
// }


import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { User, Bot, Copy, Send, FileText } from 'lucide-react';
import useToast from '../../../hooks/useToast';
import axiosInstance from '../../../axiosInstance';
import localInstance from '../../../localInstance';

export default function ChatInterface({ selectedProject }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { showToast } = useToast();
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    showToast('Copied to clipboard!');
  };

  const handleSendMessage = async () => {
    console.log("handlesendmessage called....");
    if (inputMessage.trim() && selectedProject?.id) {
      const userMessage = {
        id: Date.now().toString(),
        content: inputMessage,
        role: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');
      try {
        const payload = {
          project_id: selectedProject.id,
          message: userMessage.content,
          role: "user",
        };
        const response = await localInstance.post('/chat', payload);
        const data = response.data;
        console.log("chat data....", data);
        const botMessage = {
          id: data.project_id || Date.now().toString(),
          content: data.content,
          role: data.persona === "Router" ? "assistant" : "user",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        showToast('Failed to send message', { type: 'error' });
      }
    }
  };

  const generateSampleDocuments = () => {
    return [
      {
        id: Date.now().toString(),
        name: `${selectedProject?.name}-summary.docx`,
        type: 'docx',
        content: `Summary document for ${selectedProject?.name}`
      },
      {
        id: (Date.now() + 1).toString(),
        name: `${selectedProject?.name}-notes.txt`,
        type: 'txt',
        content: `Notes about ${selectedProject?.name}`
      },
      {
        id: (Date.now() + 2).toString(),
        name: `${selectedProject?.name}-presentation.pptx`,
        type: 'ppt',
        content: `Presentation for ${selectedProject?.name}`
      },
      {
        id: (Date.now() + 3).toString(),
        name: `${selectedProject?.name}-report.pdf`,
        type: 'pdf',
        content: `Report for ${selectedProject?.name}`
      }
    ];
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText className="h-4 w-4 mr-2 text-red-500" />;
      case 'docx': return <FileText className="h-4 w-4 mr-2 text-blue-500" />;
      case 'ppt': return <FileText className="h-4 w-4 mr-2 text-orange-500" />;
      default: return <FileText className="h-4 w-4 mr-2 text-gray-500" />;
    }
  };

  const fetchChatHistory = async () => {
    if (selectedProject?.id) {
      try {
        const response = await localInstance.get(`/conversation/${selectedProject.id}`);
        const data = response.data;
        console.log("fetchChatHistory data:", data);

        // Handle null, undefined, or non-array responses
        if (!data) {
          setMessages([]);
          return;
        }

        // Ensure data is an array
        const messagesArray = Array.isArray(data) ? data : [data];

        // Map to expected message format
        const formattedMessages = messagesArray.map((item) => ({
          id: item.project_id || Date.now().toString(),
          content: item.content || "No content provided",
          role: item.persona === "Router" ? "assistant" : "user",
          timestamp: new Date(item.created_at || Date.now()),
        }));

        setMessages(formattedMessages);
      } catch (error) {
        showToast('Failed to fetch chat history', { type: 'error' });
        setMessages([]);
      }
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [selectedProject]);

  return (
    <Box display="flex" flexDirection="column" flex={1} height="100%" sx={{ background: 'none' }}>
      <Box flex={1} overflow="auto" p={2}>
        {messages.length === 0 ? (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Box
              textAlign="center"
              maxWidth={400}
              sx={{
                border: '1.5px solid #e0e0e0',
                borderRadius: 2,
                background: 'rgba(245,248,250,0.5)',
                color: '#b0b3c6',
                fontWeight: 400,
                fontSize: 18,
                p: 4,
                boxShadow: 0,
                mx: 'auto',
              }}
            >
              <Box fontWeight={600} fontSize={20} mb={1} color="#b0b3c6">
                Start chatting about {selectedProject?.name || 'your project'}
              </Box>
              <Box color="#b0b3c6" fontSize={15}>
                Send a message to begin your conversation about this project.
              </Box>
            </Box>
          </Box>
        ) : (
          messages.map((message) => (
            <Box key={message.id} display="flex" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
              <Box
                maxWidth={600}
                borderRadius={3}
                p={2}
                sx={{
                  background: '#f3f0fa',
                  color: '#8134af',
                  border: '1.5px solid #ececec',
                  boxShadow: 1,
                  fontFamily: 'Segoe UI, sans-serif',
                  fontSize: 16,
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  {message.role === 'user' ? (
                    <User style={{ height: 16, width: 16, marginRight: 8, color: '#8134af' }} />
                  ) : (
                    <Bot style={{ height: 16, width: 16, marginRight: 8, color: '#8134af' }} />
                  )}
                  <Box fontSize={12} fontWeight="fontWeightMedium" color="#8134af">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </Box>
                  <Box fontSize={12} ml={2} color="#8134af">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Box>
                  {message.role === 'Router' && (
                    <Button 
                      onClick={() => handleCopyMessage(message.content)}
                      size="small"
                      sx={{ minWidth: 0, ml: 1, color: '#8134af' }}
                      title="Copy message"
                    >
                      <Copy style={{ height: 16, width: 16 }} />
                    </Button>
                  )}
                </Box>
                <Box>{message.content}</Box>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box borderTop={1} borderColor="#e0e0e0" p={2} display="flex" gap={2} alignItems="center" sx={{ background: 'rgba(255,255,255,0.95)' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Message about ${selectedProject?.name}...`}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          InputProps={{
            style: {
              background: '#fbeee6',
              borderRadius: 8,
              fontFamily: 'Segoe UI, sans-serif',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || !selectedProject?.name}
          sx={{
            background: 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: '0 2px 8px 0 rgba(221, 42, 123, 0.10)',
            fontSize: 18,
            letterSpacing: 1,
            minWidth: 48,
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              background: 'linear-gradient(90deg, #515bd4 0%, #8134af 30%, #dd2a7b 70%, #f58529 100%)',
            },
          }}
        >
          <Send style={{ height: 24, width: 24 }} />
        </Button>
      </Box>
    </Box>
  );
}




// import { useState, useRef, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { User, Bot, Copy, Send, FileText } from 'lucide-react';
// import useToast from '../../../hooks/useToast';
// import axiosInstance from '../../../axiosInstance';
// import localInstance from '../../../localInstance';

// export default function ChatInterface({ selectedProject }) {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const messagesEndRef = useRef(null);
//   const { showToast } = useToast();
//   const user = localStorage.getItem('user');
//   const userData = JSON.parse(user);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleCopyMessage = (content) => {
//     navigator.clipboard.writeText(content);
//     showToast('Copied to clipboard!');
//   };

//   const handleSendMessage = async () => {
//     console.log("handlesendmessage called....");
//     if (inputMessage.trim() && selectedProject?.id) {
//       const userMessage = {
//         id: Date.now().toString(),
//         content: inputMessage,
//         role: 'user',
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, userMessage]);
//       setInputMessage('');
//       try {
//         const payload = {
//           project_id: selectedProject.id,
//           message: userMessage.content,
//           role: "user",
//         };
//         const response = await localInstance.post('/chat', payload);
//         const data = response.data;
//         console.log("chat data....", data);
//         const botMessage = {
//           id: data.project_id || Date.now().toString(),
//           content: data.content,
//           role: data.persona || "unknown",
//           timestamp: new Date(),
//         };
//         if (botMessage.content && botMessage.content.trim()) {
//           setMessages((prev) => [...prev, botMessage]);
//         }
//       } catch (error) {
//         showToast('Failed to send message', { type: 'error' });
//       }
//     }
//   };

//   const generateSampleDocuments = () => {
//     return [
//       {
//         id: Date.now().toString(),
//         name: `${selectedProject?.name}-summary.docx`,
//         type: 'docx',
//         content: `Summary document for ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 1).toString(),
//         name: `${selectedProject?.name}-notes.txt`,
//         type: 'txt',
//         content: `Notes about ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 2).toString(),
//         name: `${selectedProject?.name}-presentation.pptx`,
//         type: 'ppt',
//         content: `Presentation for ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 3).toString(),
//         name: `${selectedProject?.name}-report.pdf`,
//         type: 'pdf',
//         content: `Report for ${selectedProject?.name}`
//       }
//     ];
//   };

//   const getFileIcon = (type) => {
//     switch(type) {
//       case 'pdf': return <FileText className="h-4 w-4 mr-2 text-red-500" />;
//       case 'docx': return <FileText className="h-4 w-4 mr-2 text-blue-500" />;
//       case 'ppt': return <FileText className="h-4 w-4 mr-2 text-orange-500" />;
//       default: return <FileText className="h-4 w-4 mr-2 text-gray-500" />;
//     }
//   };

//   const fetchChatHistory = async () => {
//     if (selectedProject?.id) {
//       try {
//         const response = await localInstance.get(`/conversation/${selectedProject.id}`);
//         const data = response.data;
//         console.log("fetchChatHistory data:", data);

//         // Handle null, undefined, or non-array responses
//         if (!data) {
//           setMessages([]);
//           return;
//         }

//         // Ensure data is an array
//         const messagesArray = Array.isArray(data) ? data : [data];

//         // Filter and map to expected message format, excluding items without valid content
//         const formattedMessages = messagesArray
//           .filter((item) => item.content && item.content.trim())
//           .map((item) => ({
//             id: item.project_id || Date.now().toString(),
//             content: item.content,
//             role: item.persona || "unknown",
//             timestamp: new Date(item.created_at || Date.now()),
//           }));

//         setMessages(formattedMessages);
//       } catch (error) {
//         console.error("fetchChatHistory error:", error);
//         showToast('Failed to fetch chat history', { type: 'error' });
//         setMessages([]);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchChatHistory();
//   }, [selectedProject]);

//   return (
//     <Box display="flex" flexDirection="column" flex={1} height="100%" sx={{ background: 'none' }}>
//       <Box flex={1} overflow="auto" p={2}>
//         {messages.length === 0 ? (
//           <Box display="flex" alignItems="center" justifyContent="center" height="100%">
//             <Box
//               textAlign="center"
//               maxWidth={400}
//               sx={{
//                 border: '1.5px solid #e0e0e0',
//                 borderRadius: 2,
//                 background: 'rgba(245,248,250,0.5)',
//                 color: '#b0b3c6',
//                 fontWeight: 400,
//                 fontSize: 18,
//                 p: 4,
//                 boxShadow: 0,
//                 mx: 'auto',
//               }}
//             >
//               <Box fontWeight={600} fontSize={20} mb={1} color="#b0b3c6">
//                 Start chatting about {selectedProject?.name || 'your project'}
//               </Box>
//               <Box color="#b0b3c6" fontSize={15}>
//                 Send a message to begin your conversation about this project.
//               </Box>
//             </Box>
//           </Box>
//         ) : (
//           messages
//             .filter((message) => message.content && message.content.trim())
//             .map((message) => (
//               <Box key={message.id} display="flex" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
//                 <Box
//                   maxWidth={600}
//                   borderRadius={3}
//                   p={2}
//                   sx={{
//                     background: '#f3f0fa',
//                     color: '#8134af',
//                     border: '1.5px solid #ececec',
//                     boxShadow: 1,
//                     fontFamily: 'Segoe UI, sans-serif',
//                     fontSize: 16,
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" mb={1}>
//                     {message.role === 'user' ? (
//                       <User style={{ height: 16, width: 16, marginRight: 8, color: '#8134af' }} />
//                     ) : (
//                       <Bot style={{ height: 16, width: 16, marginRight: 8, color: '#8134af' }} />
//                     )}
//                     <Box fontSize={12} fontWeight="fontWeightMedium" color="#8134af">
//                       {message.role === 'user' ? 'You' : message.role}
//                     </Box>
//                     <Box fontSize={12} ml={2} color="#8134af">
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </Box>
//                     {message.role !== 'user' && (
//                       <Button 
//                         onClick={() => handleCopyMessage(message.content)}
//                         size="small"
//                         sx={{ minWidth: 0, ml: 1, color: '#8134af' }}
//                         title="Copy message"
//                       >
//                         <Copy style={{ height: 16, width: 16 }} />
//                       </Button>
//                     )}
//                   </Box>
//                   <Box>{message.content}</Box>
//                 </Box>
//               </Box>
//             ))
//         )}
//         <div ref={messagesEndRef} />
//       </Box>
//       <Box borderTop={1} borderColor="#e0e0e0" p={2} display="flex" gap={2} alignItems="center" sx={{ background: 'rgba(255,255,255,0.95)' }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder={`Message about ${selectedProject?.name}...`}
//           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//           InputProps={{
//             style: {
//               background: '#fbeee6',
//               borderRadius: 8,
//               fontFamily: 'Segoe UI, sans-serif',
//             },
//           }}
//         />
//         <Button
//           variant="contained"
//           onClick={handleSendMessage}
//           disabled={!inputMessage.trim() || !selectedProject?.name}
//           sx={{
//             background: 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
//             color: '#fff',
//             fontWeight: 600,
//             borderRadius: 2,
//             boxShadow: '0 2px 8px 0 rgba(221, 42, 123, 0.10)',
//             fontSize: 18,
//             letterSpacing: 1,
//             minWidth: 48,
//             minHeight: 48,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             '&:hover': {
//               background: 'linear-gradient(90deg, #515bd4 0%, #8134af 30%, #dd2a7b 70%, #f58529 100%)',
//             },
//           }}
//         >
//           <Send style={{ height: 24, width: 24 }} />
//         </Button>
//       </Box>
//     </Box>
//   );
// }


// import { useState, useRef, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { User, Bot, Copy, Send, FileText } from 'lucide-react';
// import useToast from '../../../hooks/useToast';
// import axiosInstance from '../../../axiosInstance';
// import localInstance from '../../../localInstance';

// export default function ChatInterface({ selectedProject }) {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const messagesEndRef = useRef(null);
//   const { showToast } = useToast();
//   const user = localStorage.getItem('user');
//   const userData = JSON.parse(user);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleCopyMessage = (content) => {
//     navigator.clipboard.writeText(content);
//     showToast('Copied to clipboard!');
//   };

//   const handleSendMessage = async () => {
//     console.log("handlesendmessage called....");
//     if (inputMessage.trim() && selectedProject?.id) {
//       const userMessage = {
//         id: Date.now().toString(),
//         content: inputMessage,
//         role: 'user',
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, userMessage]);
//       setInputMessage('');
//       try {
//         const payload = {
//           project_id: selectedProject.id,
//           message: userMessage.content,
//           role: "user",
//         };
//         const response = await localInstance.post('/chat', payload);
//         const data = response.data;
//         console.log("chat data....", data);
//         const botMessage = {
//           id: data.project_id || Date.now().toString(),
//           content: data.content,
//           role: data.persona || "unknown",
//           timestamp: new Date(),
//         };
//         if (botMessage.content && botMessage.content.trim()) {
//           setMessages((prev) => [...prev, botMessage]);
//         }
//       } catch (error) {
//         showToast('Failed to send message', { type: 'error' });
//       }
//     }
//   };

//   const generateSampleDocuments = () => {
//     return [
//       {
//         id: Date.now().toString(),
//         name: `${selectedProject?.name}-summary.docx`,
//         type: 'docx',
//         content: `Summary document for ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 1).toString(),
//         name: `${selectedProject?.name}-notes.txt`,
//         type: 'txt',
//         content: `Notes about ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 2).toString(),
//         name: `${selectedProject?.name}-presentation.pptx`,
//         type: 'ppt',
//         content: `Presentation for ${selectedProject?.name}`
//       },
//       {
//         id: (Date.now() + 3).toString(),
//         name: `${selectedProject?.name}-report.pdf`,
//         type: 'pdf',
//         content: `Report for ${selectedProject?.name}`
//       }
//     ];
//   };

//   const getFileIcon = (type) => {
//     switch(type) {
//       case 'pdf': return <FileText className="h-4 w-4 mr-2 text-red-500" />;
//       case 'docx': return <FileText className="h-4 w-4 mr-2 text-blue-500" />;
//       case 'ppt': return <FileText className="h-4 w-4 mr-2 text-orange-500" />;
//       default: return <FileText className="h-4 w-4 mr-2 text-gray-500" />;
//     }
//   };

//   const fetchChatHistory = async () => {
//     if (selectedProject?.id) {
//       try {
//         const response = await localInstance.get(`/conversation/${selectedProject.id}`);
//         const data = response.data;
//         console.log("fetchChatHistory data:", data);

//         // Handle null, undefined, or non-array responses
//         if (!data) {
//           setMessages([]);
//           return;
//         }

//         // Ensure data is an array
//         const messagesArray = Array.isArray(data) ? data : [data];

//         // Filter and map to expected message format, excluding items without valid content
//         const formattedMessages = messagesArray
//           .filter((item) => item.content && item.content.trim())
//           .map((item) => ({
//             id: item.project_id || Date.now().toString(),
//             content: item.content,
//             role: item.persona || "unknown",
//             timestamp: new Date(item.created_at || Date.now()),
//           }));

//         setMessages(formattedMessages);
//       } catch (error) {
//         console.error("fetchChatHistory error:", error);
//         showToast('Failed to fetch chat history', { type: 'error' });
//         setMessages([]);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchChatHistory();
//   }, [selectedProject]);

//   // Get message styling based on role
//   const getMessageStyle = (role) => {
//     if (role === 'user') {
//       return {
//         background: '#f3f0fa',
//         color: '#8134af',
//         border: '1.5px solid #ececec',
//         borderRadius: 3,
//         p: 2,
//         boxShadow: 1,
//         fontFamily: 'Segoe UI, sans-serif',
//         fontSize: 16,
//       };
//     } else {
//       return {
//         background: '#f5f5f5',
//         color: '#424242',
//         border: '1.5px solid #e0e0e0',
//         borderRadius: 3,
//         p: 2,
//         boxShadow: 1,
//         fontFamily: 'Segoe UI, sans-serif',
//         fontSize: 16,
//       };
//     }
//   };

//   // Get icon color based on role
//   const getIconColor = (role) => {
//     return role === 'user' ? '#8134af' : '#424242';
//   };

//   return (
//     <Box display="flex" flexDirection="column" flex={1} height="100%" sx={{ background: 'none' }}>
//       <Box flex={1} overflow="auto" p={2}>
//         {messages.length === 0 ? (
//           <Box display="flex" alignItems="center" justifyContent="center" height="100%">
//             <Box
//               textAlign="center"
//               maxWidth={400}
//               sx={{
//                 border: '1.5px solid #e0e0e0',
//                 borderRadius: 2,
//                 background: 'rgba(245,248,250,0.5)',
//                 color: '#b0b3c6',
//                 fontWeight: 400,
//                 fontSize: 18,
//                 p: 4,
//                 boxShadow: 0,
//                 mx: 'auto',
//               }}
//             >
//               <Box fontWeight={600} fontSize={20} mb={1} color="#b0b3c6">
//                 Start chatting about {selectedProject?.name || 'your project'}
//               </Box>
//               <Box color="#b0b3c6" fontSize={15}>
//                 Send a message to begin your conversation about this project.
//               </Box>
//             </Box>
//           </Box>
//         ) : (
//           messages
//             .filter((message) => message.content && message.content.trim())
//             .map((message) => (
//               <Box key={message.id} display="flex" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
//                 <Box
//                   maxWidth={600}
//                   sx={getMessageStyle(message.role)}
//                 >
//                   <Box display="flex" alignItems="center" mb={1}>
//                     {message.role === 'user' ? (
//                       <User style={{ height: 16, width: 16, marginRight: 8, color: getIconColor(message.role) }} />
//                     ) : (
//                       <Bot style={{ height: 16, width: 16, marginRight: 8, color: getIconColor(message.role) }} />
//                     )}
//                     <Box fontSize={12} fontWeight="fontWeightMedium" color={getIconColor(message.role)}>
//                       {message.role === 'user' ? 'You' : message.role}
//                     </Box>
//                     <Box fontSize={12} ml={2} color={getIconColor(message.role)} sx={{ opacity: 0.8 }}>
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </Box>
//                     {message.role !== 'user' && (
//                       <Button 
//                         onClick={() => handleCopyMessage(message.content)}
//                         size="small"
//                         sx={{ minWidth: 0, ml: 1, color: getIconColor(message.role) }}
//                         title="Copy message"
//                       >
//                         <Copy style={{ height: 16, width: 16 }} />
//                       </Button>
//                     )}
//                   </Box>
//                   <Box>{message.content}</Box>
//                 </Box>
//               </Box>
//             ))
//         )}
//         <div ref={messagesEndRef} />
//       </Box>
//       <Box borderTop={1} borderColor="#e0e0e0" p={2} display="flex" gap={2} alignItems="center" sx={{ background: 'rgba(255,255,255,0.95)' }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder={`Message about ${selectedProject?.name}...`}
//           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//           InputProps={{
//             style: {
//               background: '#fbeee6',
//               borderRadius: 8,
//               fontFamily: 'Segoe UI, sans-serif',
//             },
//           }}
//         />
//         <Button
//           variant="contained"
//           onClick={handleSendMessage}
//           disabled={!inputMessage.trim() || !selectedProject?.name}
//           sx={{
//             background: 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
//             color: '#fff',
//             fontWeight: 600,
//             borderRadius: 2,
//             boxShadow: '0 2px 8px 0 rgba(221, 42, 123, 0.10)',
//             fontSize: 18,
//             letterSpacing: 1,
//             minWidth: 48,
//             minHeight: 48,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             '&:hover': {
//               background: 'linear-gradient(90deg, #515bd4 0%, #8134af 30%, #dd2a7b 70%, #f58529 100%)',
//             },
//           }}
//         >
//           <Send style={{ height: 24, width: 24 }} />
//         </Button>
//       </Box>
//     </Box>
//   );
// }