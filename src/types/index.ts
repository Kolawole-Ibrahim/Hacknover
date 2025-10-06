// Core Platform Types
export interface Organization {
  id: string
  name: string
  domain?: string
  subscriptionTier: 'basic' | 'professional' | 'enterprise'
  status: 'active' | 'suspended' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  organizationId: string
  email: string
  name?: string
  role: 'admin' | 'user' | 'viewer'
  mfaEnabled: boolean
  lastLogin?: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Security Module Types
export interface SecurityModule {
  id: string
  organizationId: string
  moduleType: 'endpoint' | 'email' | 'web' | 'backup'
  status: 'active' | 'inactive' | 'error' | 'updating'
  configuration?: Record<string, any>
  lastScan?: Date
  version?: string
  createdAt: Date
  updatedAt: Date
}

export interface SecurityEvent {
  id: string
  organizationId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  eventType: string
  title: string
  description: string
  source: 'endpoint' | 'email' | 'web' | 'backup'
  resolved: boolean
  resolvedAt?: Date
  resolvedBy?: string
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

// Compliance Types
export interface ComplianceReport {
  id: string
  organizationId: string
  framework: 'NDPR' | 'POPIA' | 'GDPR'
  reportType: 'audit' | 'assessment' | 'breach_notification'
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  data: Record<string, any>
  generatedAt: Date
  submittedAt?: Date
  approvedAt?: Date
}

// Endpoint Protection Types
export interface EndpointDevice {
  id: string
  organizationId: string
  deviceId: string
  deviceName: string
  deviceType: 'windows' | 'linux' | 'macos' | 'android' | 'ios'
  osVersion?: string
  agentVersion?: string
  lastSeen: Date
  status: 'online' | 'offline' | 'error'
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
  createdAt: Date
  updatedAt: Date
}

// Email Security Types
export interface EmailEvent {
  id: string
  organizationId: string
  messageId: string
  sender: string
  recipient: string
  subject?: string
  threatType?: 'spam' | 'phishing' | 'malware' | 'clean'
  action: 'delivered' | 'quarantined' | 'blocked'
  score?: number
  createdAt: Date
}

// Web Security Types
export interface WebEvent {
  id: string
  organizationId: string
  url: string
  domain: string
  category?: string
  action: 'allowed' | 'blocked' | 'warned'
  userAgent?: string
  ipAddress?: string
  createdAt: Date
}

// Backup Types
export interface BackupJob {
  id: string
  organizationId: string
  jobType: 'full' | 'incremental' | 'differential'
  status: 'pending' | 'running' | 'completed' | 'failed'
  sourcePath: string
  destinationPath: string
  size?: bigint
  duration?: number
  errorMessage?: string
  startedAt?: Date
  completedAt?: Date
  createdAt: Date
}

// SIEM Types
export interface SiemLog {
  id: string
  organizationId: string
  logType: 'auth' | 'network' | 'system' | 'application'
  severity: 'info' | 'warning' | 'error' | 'critical'
  message: string
  source: string
  timestamp: Date
  metadata?: Record<string, any>
}

// Threat Intelligence Types
export interface ThreatIntelligence {
  id: string
  indicator: string
  indicatorType: 'ip' | 'domain' | 'hash' | 'url'
  threatType: string
  confidence: number
  source: string
  firstSeen: Date
  lastSeen: Date
  isActive: boolean
}

// ML Anomaly Detection Types
export interface AnomalyDetection {
  id: string
  organizationId: string
  modelType: 'network' | 'user_behavior' | 'system'
  anomalyScore: number
  confidence: number
  description: string
  isAnomaly: boolean
  investigated: boolean
  createdAt: Date
}

// Dashboard Types
export interface DashboardStats {
  totalDevices: number
  onlineDevices: number
  securityEvents: number
  criticalEvents: number
  complianceScore: number
  lastBackup?: Date
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
}

export interface SecurityOverview {
  endpointProtection: {
    status: 'active' | 'inactive' | 'error'
    devicesProtected: number
    threatsBlocked: number
    lastScan?: Date
  }
  emailSecurity: {
    status: 'active' | 'inactive' | 'error'
    emailsScanned: number
    threatsBlocked: number
    lastScan?: Date
  }
  webSecurity: {
    status: 'active' | 'inactive' | 'error'
    requestsFiltered: number
    threatsBlocked: number
    lastScan?: Date
  }
  backupRecovery: {
    status: 'active' | 'inactive' | 'error'
    lastBackup?: Date
    backupSize?: number
    recoveryPoints: number
  }
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface OrganizationSetupForm {
  name: string
  domain?: string
  industry: string
  employeeCount: number
  complianceRequirements: string[]
}

export interface SecurityModuleConfig {
  endpointProtection: {
    enabled: boolean
    realTimeScanning: boolean
    quarantineThreats: boolean
  }
  emailSecurity: {
    enabled: boolean
    spamFiltering: boolean
    phishingProtection: boolean
    attachmentScanning: boolean
  }
  webSecurity: {
    enabled: boolean
    contentFiltering: boolean
    malwareProtection: boolean
    safeSearch: boolean
  }
  backupRecovery: {
    enabled: boolean
    frequency: 'daily' | 'weekly' | 'monthly'
    retentionDays: number
    cloudBackup: boolean
  }
}

// Compliance Framework Types
export interface ComplianceFramework {
  name: 'NDPR' | 'POPIA' | 'GDPR'
  description: string
  requirements: ComplianceRequirement[]
  applicable: boolean
}

export interface ComplianceRequirement {
  id: string
  title: string
  description: string
  category: string
  status: 'compliant' | 'non_compliant' | 'not_applicable'
  evidence?: string[]
  lastAssessed?: Date
}
