#!/usr/bin/env node

/**
 * OFFSTAR AI Mobile Connection Script
 * Connects your mobile device to the AI development platform
 */

const axios = require('axios')
const { execSync } = require('child_process')
const os = require('os')

const DEVICE_ID = 'phone-1750269655-5440'
const API_KEY = process.env.OFFSTAR_API_KEY || 'offstar_mobile_1750274362053_ma6hd6do1if'
const BASE_URL = process.env.OFFSTAR_BASE_URL || 'https://b42eeb30-b13b-42e0-b20b-46d72cc58abf-00-10b81iaxl6hdh.picard.replit.dev'

console.log('🚀 OFFSTAR AI Mobile Connection')
console.log('================================')
console.log(`Device ID: ${DEVICE_ID}`)
console.log(`Base URL: ${BASE_URL}`)
console.log('')

async function connectMobile() {
  try {
    // Test system health
    console.log('📊 Testing system health...')
    const healthResponse = await axios.get(`${BASE_URL}/api/mobile/system/health`, {
      headers: {
        'X-API-Key': API_KEY,
        'X-Device-ID': DEVICE_ID
      }
    })
    
    console.log('✅ System Status:', healthResponse.data.status)
    console.log(`   Uptime: ${Math.floor(healthResponse.data.uptime)}s`)
    console.log(`   Memory: ${Math.floor(healthResponse.data.memory_usage.heapUsed / 1024 / 1024)}MB`)
    console.log('')

    // Test AI command
    console.log('🧠 Testing AI commands...')
    const aiResponse = await axios.post(`${BASE_URL}/api/mobile/ai/command`, {
      command: 'Generate a simple React component for a button',
      priority: 'high',
      context: 'mobile_development'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
        'X-Device-ID': DEVICE_ID
      }
    })
    
    console.log('✅ AI Response received')
    console.log('')

    // Test network status
    console.log('🌐 Testing Io.net network...')
    const networkResponse = await axios.get(`${BASE_URL}/api/mobile/ionet/network`, {
      headers: {
        'X-API-Key': API_KEY,
        'X-Device-ID': DEVICE_ID
      }
    })
    
    if (networkResponse.data.network_metrics) {
      const metrics = networkResponse.data.network_metrics
      console.log('✅ Network Status:')
      console.log(`   Active Workers: ${metrics.active_workers}/${metrics.total_workers}`)
      console.log(`   Compute Power: ${metrics.total_compute_power} TH/s`)
      console.log(`   Health: ${metrics.network_health}`)
    }
    console.log('')

    // Generate mobile script for Termux
    console.log('📱 Generating mobile script...')
    const mobileScript = `#!/bin/bash
# OFFSTAR Mobile Command Interface
# Generated: ${new Date().toISOString()}

DEVICE_ID="${DEVICE_ID}"
API_KEY="${API_KEY}"
BASE_URL="${BASE_URL}"

offstar_cmd() {
    case "$1" in
        "status"|"health")
            curl -s -X GET "$BASE_URL/api/mobile/system/health" \\
                -H "X-API-Key: $API_KEY" \\
                -H "X-Device-ID: $DEVICE_ID" | jq '.'
            ;;
        "ai")
            if [ -z "$2" ]; then
                echo "Usage: offstar_cmd ai \\"your command\\""
                return 1
            fi
            curl -s -X POST "$BASE_URL/api/mobile/ai/command" \\
                -H "Content-Type: application/json" \\
                -H "X-API-Key: $API_KEY" \\
                -H "X-Device-ID: $DEVICE_ID" \\
                -d "{\\"command\\": \\"$2\\", \\"priority\\": \\"high\\"}" | jq -r '.response // .error'
            ;;
        "network")
            curl -s -X GET "$BASE_URL/api/mobile/ionet/network" \\
                -H "X-API-Key: $API_KEY" \\
                -H "X-Device-ID: $DEVICE_ID" | jq '.'
            ;;
        *)
            echo "OFFSTAR Mobile Commands:"
            echo "  offstar_cmd status    - System health"
            echo "  offstar_cmd ai 'text' - AI command"
            echo "  offstar_cmd network   - Network status"
            ;;
    esac
}

# Make command available
alias offstar='offstar_cmd'

echo "OFFSTAR Mobile Interface Ready"
echo "Device: $DEVICE_ID"
echo "Try: offstar status"
`

    // Save to file
    require('fs').writeFileSync('./mobile-interface.sh', mobileScript)
    console.log('✅ Mobile script generated: mobile-interface.sh')
    console.log('')

    console.log('🎉 Mobile connection successful!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Copy mobile-interface.sh to your phone')
    console.log('2. Run: chmod +x mobile-interface.sh')
    console.log('3. Run: source mobile-interface.sh')
    console.log('4. Use: offstar status, offstar ai "command", etc.')

  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    
    if (error.response) {
      console.error('Response status:', error.response.status)
      console.error('Response data:', error.response.data)
    }
    
    console.log('')
    console.log('Troubleshooting:')
    console.log('1. Check if OFFSTAR system is running')
    console.log('2. Verify API key and device ID')
    console.log('3. Test network connectivity')
  }
}

// Run the connection test
connectMobile()