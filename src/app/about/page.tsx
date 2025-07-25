"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Globe, MapPin, Calendar, Star, Heart, Target, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src="/assets/logo.svg"
              alt="RouteStamp"
              width={120}
              height={120}
              className="h-30 w-30"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">RouteStamp</h1>
            <div className="flex items-center justify-center space-x-4 text-xl font-medium text-muted-foreground">
              <span>Travel</span>
              <span>•</span>
              <span>Track</span>
              <span>•</span>
              <span>Remember</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your personal travel companion for tracking countries visited, 
              managing travel memories, and visualizing your global adventures.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Globe className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Global Tracking</CardTitle>
              <CardDescription>
                Track every country you've visited with detailed information
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Keep a comprehensive list of countries with visit dates, ratings, 
                and personal notes about your experiences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Visual Progress</CardTitle>
              <CardDescription>
                See your travel progress with beautiful visualizations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                View your progress on interactive maps and charts, 
                track regional exploration, and celebrate your achievements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Travel Timeline</CardTitle>
              <CardDescription>
                Build a chronological timeline of your adventures
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Create a detailed timeline of your travels with dates, 
                cities visited, and memorable moments from each trip.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Rate & Review</CardTitle>
              <CardDescription>
                Rate your experiences and keep personal reviews
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Rate countries from 1-5 stars and add personal notes 
                about what made each destination special or memorable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Target className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Travel Goals</CardTitle>
              <CardDescription>
                Set and track your travel goals and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Monitor your progress toward visiting all countries, 
                explore new regions, and achieve your travel milestones.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <CardTitle>Memory Keeper</CardTitle>
              <CardDescription>
                Preserve your travel memories and stories
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Add detailed notes, stories, and memories to each country, 
                creating a personal travel journal of your adventures.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg leading-relaxed">
              RouteStamp is designed for passionate travelers who want to keep track of their 
              global adventures in a beautiful, organized way. Whether you're a seasoned 
              globetrotter or just starting your travel journey, we help you document, 
              remember, and celebrate every country you visit.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-sm text-muted-foreground">
                Built with love for the travel community
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Built With Modern Technology</CardTitle>
            <CardDescription>
              RouteStamp is built using cutting-edge web technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Next.js 15</h3>
                <p className="text-sm text-muted-foreground">React Framework</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">TypeScript</h3>
                <p className="text-sm text-muted-foreground">Type Safety</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Tailwind CSS</h3>
                <p className="text-sm text-muted-foreground">Styling</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">shadcn/ui</h3>
                <p className="text-sm text-muted-foreground">UI Components</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
} 