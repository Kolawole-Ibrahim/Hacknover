export interface SecurityModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  lastScan: Date;
  protectedDevices: number;
  blockedThreats: number;
  color: string;
  features: string[];
}

export interface ThreatDetection {
  id: string;
  type: 'malware' | 'phishing' | 'ransomware' | 'ddos' | 'intrusion';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  timestamp: Date;
  status: 'blocked' | 'quarantined' | 'investigating' | 'resolved';
  description: string;
}

export interface SecurityMetrics {
  totalThreatsBlocked: number;
  activeProtections: number;
  devicesProtected: number;
  lastScanTime: Date;
  threatTrend: 'increasing' | 'decreasing' | 'stable';
  complianceScore: number;
}

export interface SecurityAlert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: Date;
  module: string;
  actionRequired: boolean;
  resolved: boolean;
}

export interface SecurityConfig {
  autoScan: boolean;
  realTimeMonitoring: boolean;
  emailNotifications: boolean;
  quarantineMode: boolean;
  complianceMode: 'ndpr' | 'popia' | 'gdpr' | 'custom';
}
