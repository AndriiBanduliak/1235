
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FuturesTradeMate - Your Futures Trading CRM</title>
        <meta name="description" content="Manage and track your futures trading with precision" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto">
          <Dashboard />
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2023 FuturesTradeMate. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
