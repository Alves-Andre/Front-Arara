// src/shared/types/entities.ts

import type { Coordinates, Status } from './common'

export interface Area {
  id: string
  name: string
  description: string
  coordinates: Coordinates
  boundingBox?: {
    north: number
    south: number
    east: number
    west: number
  }
  areaType: 'forest' | 'wetland' | 'grassland' | 'urban' | 'other'
  status: Status
  hectares: number
  recoveryTarget?: number
  recoveryProgress?: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface MonitoringEvent {
  id: string
  areaId: string
  date: Date
  type: 'inspection' | 'measurement' | 'analysis'
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  data: Record<string, any>
  notes?: string
  attachments?: Attachment[]
  createdBy: string
  createdAt: Date
}

export interface Evidence {
  id: string
  areaId: string
  monitoringEventId?: string
  type: 'photo' | 'video' | 'document' | 'satellite_image'
  url: string
  thumbnailUrl?: string
  caption?: string
  date: Date
  coordinates?: Coordinates
  metadata?: Record<string, any>
  createdAt: Date
}

export interface SatelliteImage {
  id: string
  areaId: string
  provider: 'sentinel' | 'landsat' | 'custom'
  date: Date
  cloudCover: number
  resolution: number
  url: string
  indexData?: {
    ndvi?: number
    ndbi?: number
    ndmi?: number
  }
  createdAt: Date
}

export interface Analysis {
  id: string
  areaId: string
  type: 'ndvi' | 'ndbi' | 'change_detection' | 'classification' | 'custom'
  date: Date
  status: 'pending' | 'processing' | 'completed' | 'failed'
  result?: Record<string, any>
  visualization?: {
    type: 'raster' | 'vector' | 'chart'
    url: string
  }
  createdBy: string
  createdAt: Date
}

export interface RecoveryRequest {
  id: string
  areaId: string
  status: 'submitted' | 'approved' | 'rejected' | 'in_progress' | 'completed'
  title: string
  description: string
  requestType: 'monitoring' | 'analysis' | 'intervention' | 'inspection'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  startDate: Date
  targetEndDate: Date
  completionDate?: Date
  assignedTo?: string
  notes?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface Attachment {
  id: string
  filename: string
  mimeType: string
  size: number
  url: string
  createdAt: Date
}
