'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Network, 
  Zap, 
  Code2, 
  Rocket, 
  Activity,
  Sparkles,
  Globe,
  Database,
  Terminal
} from 'lucide-react'
import Link from 'next/link'
import { useSystemStatus } from '@/hooks/useSystemStatus'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { systemStatus, isLoading } = useSystemStatus()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className=\"min-h-screen text-white\">
      {/* Header */}
      <header className=\"border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/20\">
        <div className=\"container mx-auto px-4 py-4 flex items-center justify-between\">
          <motion.div 
            className=\"flex items-center space-x-3\"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className=\"h-8 w-8 text-purple-400\" />
            <h1 className=\"text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent\">
              OFFSTAR AI Platform
            </h1>
          </motion.div>
          
          <motion.div 
            className=\"flex items-center space-x-4\"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className=\"flex items-center space-x-2\">
              <Activity className={`h-4 w-4 ${isLoading ? 'text-yellow-400' : 'text-green-400'}`} />
              <span className=\"text-sm text-slate-300\">
                {isLoading ? 'Connecting...' : 'Online'}
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className=\"container mx-auto px-4 py-16 text-center\">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className=\"text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent\">
            AI-Powered Development
          </h2>
          <p className=\"text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto\">
            Integrating <span className=\"text-purple-400\">Codespaces</span>, <span className=\"text-cyan-400\">Replit AI</span>, 
            <span className=\"text-purple-400\"> Io.net</span>, and <span className=\"text-cyan-400\">OBL.dev</span> for 
            intelligent prototyping, building, and deployment.
          </p>
          
          <motion.div
            className=\"flex flex-col sm:flex-row gap-4 justify-center items-center\"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href=\"/dashboard\" passHref>
              <motion.button
                className=\"bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300\"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className=\"h-5 w-5\" />
                <span>Launch Dashboard</span>
              </motion.button>
            </Link>
            
            <Link href=\"/docs\" passHref>
              <motion.button
                className=\"border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300\"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code2 className=\"h-5 w-5\" />
                <span>Documentation</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className=\"container mx-auto px-4 py-16\">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\"
        >
          {[
            {
              icon: Brain,
              title: 'AI Command Center',
              description: 'Intelligent code generation and development assistance with Replit AI integration.',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: Network,
              title: 'Io.net Processing',
              description: 'Distributed AI processing power for complex computations and model training.',
              color: 'from-cyan-500 to-blue-500'
            },
            {
              icon: Globe,
              title: 'OBL.dev Planning',
              description: 'Strategic planning and analytics for development roadmaps and feature prioritization.',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: Terminal,
              title: 'Codespaces Ready',
              description: 'Pre-configured GitHub Codespaces environment with all AI development tools.',
              color: 'from-orange-500 to-red-500'
            },
            {
              icon: Database,
              title: 'Quantum Analytics',
              description: 'Consciousness-enhanced decision making and spiritual alignment metrics.',
              color: 'from-violet-500 to-purple-500'
            },
            {
              icon: Zap,
              title: 'Rapid Prototyping',
              description: 'One-click prototyping with AI assistance and automated deployment pipelines.',
              color: 'from-yellow-500 to-amber-500'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className=\"bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 group\"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className=\"h-6 w-6 text-white\" />
              </div>
              <h3 className=\"text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300\">
                {feature.title}
              </h3>
              <p className=\"text-slate-300 leading-relaxed\">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Status Section */}
      {systemStatus && (
        <section className=\"container mx-auto px-4 py-16\">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className=\"bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center\"
          >
            <h3 className=\"text-2xl font-semibold mb-6 text-white\">System Status</h3>
            <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
              <div className=\"flex flex-col items-center\">
                <div className=\"w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-3\">
                  <Activity className=\"h-8 w-8 text-green-400\" />
                </div>
                <span className=\"text-green-400 font-semibold\">System Health</span>
                <span className=\"text-sm text-slate-400 capitalize\">{systemStatus.status}</span>
              </div>
              
              <div className=\"flex flex-col items-center\">
                <div className=\"w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mb-3\">
                  <Network className=\"h-8 w-8 text-blue-400\" />
                </div>
                <span className=\"text-blue-400 font-semibold\">Network</span>
                <span className=\"text-sm text-slate-400\">Distributed AI</span>
              </div>
              
              <div className=\"flex flex-col items-center\">
                <div className=\"w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mb-3\">
                  <Brain className=\"h-8 w-8 text-purple-400\" />
                </div>
                <span className=\"text-purple-400 font-semibold\">AI Services</span>
                <span className=\"text-sm text-slate-400\">Ready</span>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Footer */}
      <footer className=\"border-t border-slate-700/50 bg-slate-900/20 backdrop-blur-sm\">
        <div className=\"container mx-auto px-4 py-8 text-center\">
          <p className=\"text-slate-400\">
            Built with ❤️ by the <span className=\"text-purple-400\">OFFSTAR Team</span>
          </p>
          <p className=\"text-sm text-slate-500 mt-2\">
            Experience the future of AI-powered development
          </p>
        </div>
      </footer>
    </div>
  )
}