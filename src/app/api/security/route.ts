import { NextRequest, NextResponse } from 'next/server';
import { SecurityMetrics, ThreatDetection, SecurityAlert } from '@/types/security';

// Mock data - in a real application, this would come from a database
const mockMetrics: SecurityMetrics = {
  totalThreatsBlocked: 1247,
  activeProtections: 4,
  devicesProtected: 23,
  lastScanTime: new Date(),
  threatTrend: 'decreasing',
  complianceScore: 95
};

const mockThreats: ThreatDetection[] = [
  {
    id: '1',
    type: 'phishing',
    severity: 'high',
    source: 'unknown@malicious.com',
    target: 'john@company.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'blocked',
    description: 'Suspicious email with malicious attachment blocked'
  },
  {
    id: '2',
    type: 'malware',
    severity: 'medium',
    source: '192.168.1.100',
    target: 'Workstation-05',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    status: 'quarantined',
    description: 'Trojan detected and quarantined'
  },
  {
    id: '3',
    type: 'ransomware',
    severity: 'critical',
    source: 'External IP',
    target: 'File Server',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: 'blocked',
    description: 'Ransomware attack prevented by behavioral analysis'
  }
];

const mockAlerts: SecurityAlert[] = [
  {
    id: '1',
    title: 'Security Scan Complete',
    message: 'All systems scanned successfully. No critical threats detected.',
    severity: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    module: 'Endpoint Protection',
    actionRequired: false,
    resolved: true
  },
  {
    id: '2',
    title: 'Suspicious Activity Detected',
    message: 'Unusual network traffic pattern detected from external source.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    module: 'Web Security',
    actionRequired: true,
    resolved: false
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'metrics':
        return NextResponse.json(mockMetrics);
      
      case 'threats':
        const limit = parseInt(searchParams.get('limit') || '10');
        return NextResponse.json(mockThreats.slice(0, limit));
      
      case 'alerts':
        const alertLimit = parseInt(searchParams.get('limit') || '10');
        return NextResponse.json(mockAlerts.slice(0, alertLimit));
      
      case 'all':
        return NextResponse.json({
          metrics: mockMetrics,
          threats: mockThreats,
          alerts: mockAlerts
        });
      
      default:
        return NextResponse.json({
          metrics: mockMetrics,
          threats: mockThreats.slice(0, 5),
          alerts: mockAlerts.slice(0, 5)
        });
    }
  } catch (error) {
    console.error('Security API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'scan':
        // Simulate security scan
        return NextResponse.json({
          success: true,
          message: 'Security scan initiated',
          scanId: `scan_${Date.now()}`
        });
      
      case 'quarantine':
        // Simulate threat quarantine
        return NextResponse.json({
          success: true,
          message: `Threat ${data.threatId} quarantined successfully`
        });
      
      case 'resolve_alert':
        // Simulate alert resolution
        return NextResponse.json({
          success: true,
          message: `Alert ${data.alertId} resolved successfully`
        });
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Security API POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
