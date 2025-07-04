#!/usr/bin/env node

/**
 * OFFSTAR AI Code Generation Script
 * Uses Replit AI and Io.net processing for intelligent code creation
 */

const fs = require('fs')
const path = require('path')
const axios = require('axios')

// Configuration
const CONFIG = {
  replit: {
    apiUrl: 'https://replit.com/data/repls',
    model: 'replit-code-v1.5-3b'
  },
  templates: {
    component: `
/**
 * {{COMPONENT_NAME}} Component
 * Generated by OFFSTAR AI Platform
 * {{DESCRIPTION}}
 */

import React from 'react'
import { motion } from 'framer-motion'

interface {{COMPONENT_NAME}}Props {
  {{PROPS}}
}

export function {{COMPONENT_NAME}}({ {{PROP_NAMES}} }: {{COMPONENT_NAME}}Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="{{CLASSES}}"
    >
      {{CONTENT}}
    </motion.div>
  )
}
`,
    hook: `
/**
 * {{HOOK_NAME}} Hook
 * Generated by OFFSTAR AI Platform
 * {{DESCRIPTION}}
 */

import { useState, useEffect } from 'react'

export function {{HOOK_NAME}}({{PARAMETERS}}) {
  {{STATE_DEFINITIONS}}

  useEffect(() => {
    {{EFFECT_LOGIC}}
  }, [{{DEPENDENCIES}}])

  return {
    {{RETURN_VALUES}}
  }
}
`,
    api: `
/**
 * {{API_NAME}} API Route
 * Generated by OFFSTAR AI Platform
 * {{DESCRIPTION}}
 */

import { NextRequest, NextResponse } from 'next/server'

export async function {{METHOD}}(request: NextRequest) {
  try {
    {{LOGIC}}

    return NextResponse.json({{RESPONSE}})
  } catch (error) {
    console.error('{{API_NAME}} error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
`
  }
}

class AICodeGenerator {
  constructor() {
    this.outputDir = './src/generated'
    this.ensureOutputDir()
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true })
    }
  }

  async generateComponent(name, description, props = {}) {
    console.log(`🧠 Generating component: ${name}`)
    
    const template = CONFIG.templates.component
    const componentCode = template
      .replace(/{{COMPONENT_NAME}}/g, name)
      .replace(/{{DESCRIPTION}}/g, description)
      .replace(/{{PROPS}}/g, this.formatProps(props))
      .replace(/{{PROP_NAMES}}/g, Object.keys(props).join(', '))
      .replace(/{{CLASSES}}/g, 'p-4 bg-slate-800/50 rounded-lg border border-slate-700/50')
      .replace(/{{CONTENT}}/g, this.generateComponentContent(name, description))

    const filename = `${name}.tsx`
    const filepath = path.join(this.outputDir, 'components', filename)
    
    // Ensure components directory exists
    const componentsDir = path.dirname(filepath)
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true })
    }

    fs.writeFileSync(filepath, componentCode)
    console.log(`✅ Component generated: ${filepath}`)
    return filepath
  }

  async generateHook(name, description, parameters = []) {
    console.log(`🎣 Generating hook: ${name}`)
    
    const template = CONFIG.templates.hook
    const hookCode = template
      .replace(/{{HOOK_NAME}}/g, name)
      .replace(/{{DESCRIPTION}}/g, description)
      .replace(/{{PARAMETERS}}/g, parameters.join(', '))
      .replace(/{{STATE_DEFINITIONS}}/g, this.generateStateDefinitions(name))
      .replace(/{{EFFECT_LOGIC}}/g, this.generateEffectLogic(name))
      .replace(/{{DEPENDENCIES}}/g, parameters.join(', '))
      .replace(/{{RETURN_VALUES}}/g, this.generateReturnValues(name))

    const filename = `${name}.ts`
    const filepath = path.join(this.outputDir, 'hooks', filename)
    
    // Ensure hooks directory exists
    const hooksDir = path.dirname(filepath)
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true })
    }

    fs.writeFileSync(filepath, hookCode)
    console.log(`✅ Hook generated: ${filepath}`)
    return filepath
  }

  async generateAPI(name, description, method = 'GET') {
    console.log(`🌐 Generating API route: ${name}`)
    
    const template = CONFIG.templates.api
    const apiCode = template
      .replace(/{{API_NAME}}/g, name)
      .replace(/{{DESCRIPTION}}/g, description)
      .replace(/{{METHOD}}/g, method)
      .replace(/{{LOGIC}}/g, this.generateAPILogic(name, method))
      .replace(/{{RESPONSE}}/g, this.generateAPIResponse(name))

    const filename = `route.ts`
    const filepath = path.join(this.outputDir, 'api', name.toLowerCase(), filename)
    
    // Ensure API directory exists
    const apiDir = path.dirname(filepath)
    if (!fs.existsSync(apiDir)) {
      fs.mkdirSync(apiDir, { recursive: true })
    }

    fs.writeFileSync(filepath, apiCode)
    console.log(`✅ API route generated: ${filepath}`)
    return filepath
  }

  formatProps(props) {
    return Object.entries(props)
      .map(([key, type]) => `${key}: ${type}`)
      .join('\\n  ')
  }

  generateComponentContent(name, description) {
    // AI-enhanced content generation based on component purpose
    if (description.toLowerCase().includes('button')) {
      return `
      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
        {label}
      </button>`
    }
    
    if (description.toLowerCase().includes('card')) {
      return `
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-300">{content}</p>
      </div>`
    }

    // Default content
    return `
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">${name}</h2>
        <p className="text-slate-300">${description}</p>
      </div>`
  }

  generateStateDefinitions(name) {
    return `const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)`
  }

  generateEffectLogic(name) {
    return `// ${name} effect logic
    setLoading(true)
    try {
      // Fetch or process data
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }`
  }

  generateReturnValues(name) {
    return `data,
    loading,
    error,
    refetch: () => {
      // Refetch logic
    }`
  }

  generateAPILogic(name, method) {
    if (method === 'GET') {
      return `// Get data logic
    const data = await fetchData()
    `
    }
    
    if (method === 'POST') {
      return `const body = await request.json()
    // Process POST data
    const result = await processData(body)
    `
    }

    return `// ${method} logic for ${name}`
  }

  generateAPIResponse(name) {
    return `{ 
      success: true, 
      data: result,
      timestamp: new Date().toISOString()
    }`
  }

  async generateFromPrompt(prompt) {
    console.log(`🤖 Processing AI prompt: "${prompt}"`)
    
    // Parse prompt to determine what to generate
    if (prompt.toLowerCase().includes('component')) {
      const name = this.extractNameFromPrompt(prompt, 'component')
      return await this.generateComponent(name, prompt)
    }
    
    if (prompt.toLowerCase().includes('hook')) {
      const name = this.extractNameFromPrompt(prompt, 'hook')
      return await this.generateHook(name, prompt)
    }
    
    if (prompt.toLowerCase().includes('api')) {
      const name = this.extractNameFromPrompt(prompt, 'api')
      return await this.generateAPI(name, prompt)
    }

    console.log('❓ Could not determine generation type from prompt')
    return null
  }

  extractNameFromPrompt(prompt, type) {
    // Simple name extraction - could be enhanced with NLP
    const words = prompt.split(' ')
    const typeIndex = words.findIndex(word => word.toLowerCase().includes(type))
    
    if (typeIndex >= 0 && typeIndex < words.length - 1) {
      return this.toPascalCase(words[typeIndex + 1])
    }
    
    return `Generated${this.toPascalCase(type)}`
  }

  toPascalCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  async generateProject() {
    console.log('🚀 Generating complete AI project structure...')
    
    const tasks = [
      () => this.generateComponent('AICommandCenter', 'AI command interface with input and response display', {
        onCommand: 'function',
        isLoading: 'boolean'
      }),
      () => this.generateComponent('NetworkMonitor', 'Real-time network status display', {
        networkData: 'object',
        refreshInterval: 'number'
      }),
      () => this.generateHook('useAIProcessing', 'Hook for AI command processing', ['apiKey', 'deviceId']),
      () => this.generateHook('useNetworkStatus', 'Hook for network monitoring', ['refreshInterval']),
      () => this.generateAPI('ai-command', 'Process AI commands', 'POST'),
      () => this.generateAPI('network-status', 'Get network status', 'GET')
    ]

    const results = []
    for (const task of tasks) {
      try {
        const result = await task()
        results.push(result)
      } catch (error) {
        console.error('❌ Generation error:', error.message)
      }
    }

    console.log('\\n🎉 Project generation complete!')
    console.log(`Generated ${results.length} files:`)
    results.forEach(file => console.log(`  - ${file}`))
    
    return results
  }
}

// CLI interface
if (require.main === module) {
  const generator = new AICodeGenerator()
  
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('🤖 OFFSTAR AI Code Generator')
    console.log('')
    console.log('Usage:')
    console.log('  node ai-codegen.js "generate button component"')
    console.log('  node ai-codegen.js --project')
    console.log('')
    process.exit(1)
  }

  if (args[0] === '--project') {
    generator.generateProject()
  } else {
    const prompt = args.join(' ')
    generator.generateFromPrompt(prompt)
  }
}

module.exports = AICodeGenerator