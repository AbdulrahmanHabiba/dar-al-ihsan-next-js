"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Newspaper, 
  GraduationCap, 
  Users, 
  MessageSquare, 
  BookOpen,
  TrendingUp,
  LogOut
} from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import NewsManager from "@/components/dashboard/NewsManager";
import TeachersManager from "@/components/dashboard/TeachersManager";
import GraduatesManager from "@/components/dashboard/GraduatesManager";
import ComplaintsManager from "@/components/dashboard/ComplaintsManager";
import MagazineManager from "@/components/dashboard/MagazineManager";
import SuccessStoriesManager from "@/components/dashboard/SuccessStoriesManager";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">لوحة التحكم - دار التحفيظ</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">المدير العام</p>
              <p className="text-sm text-muted-foreground">admin@dar.com</p>
            </div>
            <Button variant="outline" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">نظرة عامة</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              <span className="hidden md:inline">الأخبار</span>
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">المعلمين</span>
            </TabsTrigger>
            <TabsTrigger value="graduates" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden md:inline">الخريجين</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">الشكاوي</span>
            </TabsTrigger>
            <TabsTrigger value="magazine" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">المجلة</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden md:inline">قصص النجاح</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="teachers">
            <TeachersManager />
          </TabsContent>

          <TabsContent value="graduates">
            <GraduatesManager />
          </TabsContent>

          <TabsContent value="complaints">
            <ComplaintsManager />
          </TabsContent>

          <TabsContent value="magazine">
            <MagazineManager />
          </TabsContent>

          <TabsContent value="stories">
            <SuccessStoriesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;