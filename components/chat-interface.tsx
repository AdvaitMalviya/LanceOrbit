"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MessageCircle, X } from "lucide-react"

interface Message {
  id: string
  sender: string
  senderRole: "client" | "freelancer"
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  participantName: string
  participantRole: "client" | "freelancer"
  projectTitle: string
  messages: Message[]
  unread: number
}

interface ChatInterfaceProps {
  currentUser: { id: string; name: string; role: "client" | "freelancer" }
}

export default function ChatInterface({ currentUser }: ChatInterfaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participantName: "Alex Chen",
      participantRole: "freelancer",
      projectTitle: "Build AI Chatbot",
      messages: [
        {
          id: "m1",
          sender: "Alex Chen",
          senderRole: "freelancer",
          content: "Hi! I'm interested in your AI chatbot project. I have 5 years of experience with OpenAI APIs.",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "m2",
          sender: currentUser.name,
          senderRole: currentUser.role,
          content: "Great! Can you tell me more about your experience with NLP?",
          timestamp: new Date(Date.now() - 1800000),
        },
        {
          id: "m3",
          sender: "Alex Chen",
          senderRole: "freelancer",
          content: "I've worked on several NLP projects including sentiment analysis and text classification.",
          timestamp: new Date(Date.now() - 900000),
        },
      ],
      unread: 0,
    },
    {
      id: "2",
      participantName: "Sarah Johnson",
      participantRole: "freelancer",
      projectTitle: "Mobile App Design",
      messages: [
        {
          id: "m4",
          sender: "Sarah Johnson",
          senderRole: "freelancer",
          content: "I'd love to work on your mobile app design project!",
          timestamp: new Date(Date.now() - 7200000),
        },
      ],
      unread: 1,
    },
  ])

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1")
  const [messageInput, setMessageInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversationId, conversations])

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId)

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: currentUser.name,
      senderRole: currentUser.role,
      content: messageInput,
      timestamp: new Date(),
    }

    setConversations(
      conversations.map((conv) => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
          }
        }
        return conv
      }),
    )

    setMessageInput("")

    // Simulate a response after a delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        sender: selectedConversation.participantName,
        senderRole: selectedConversation.participantRole,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date(),
      }

      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === selectedConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, responseMessage],
            }
          }
          return conv
        }),
      )
    }, 1000)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <div className="lg:col-span-1 border border-glow rounded-lg bg-card/50 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-glow">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Messages
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversationId(conversation.id)}
              className={`w-full p-4 border-b border-border text-left transition-all hover:bg-primary/10 ${
                selectedConversationId === conversation.id ? "bg-primary/20 border-l-2 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <p className="font-medium">{conversation.participantName}</p>
                {conversation.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unread}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">{conversation.projectTitle}</p>
              <p className="text-xs text-muted-foreground truncate">
                {conversation.messages[conversation.messages.length - 1]?.content}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2 border border-glow rounded-lg bg-card/50 overflow-hidden flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-glow flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedConversation.participantName}</h3>
                <p className="text-xs text-muted-foreground">{selectedConversation.projectTitle}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === currentUser.name ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === currentUser.name
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-glow">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="bg-input border-border text-foreground"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}
