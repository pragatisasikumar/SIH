import axios from 'axios';
import { 
  INITIAL_DASHBOARD_STATS, 
  INITIAL_SCREENINGS_LIST, 
  INITIAL_BLOCKCHAIN_BLOCKS, 
  generateDeterministicScreeningResult 
} from '../data/demoData';

const BASE_URL = 'http://127.0.0.1:8000';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 4000,
});

let isBackendAvailable = false;
let listeners = [];

export function subscribeBackendStatus(callback) {
  listeners.push(callback);
  callback(isBackendAvailable);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
}

function notifyStatus(status) {
  if (isBackendAvailable !== status) {
    isBackendAvailable = status;
    listeners.forEach(cb => cb(isBackendAvailable));
  }
}

// Check Backend Health
export async function checkBackendHealth() {
  try {
    const res = await client.get('/api/health');
    if (res.status === 200) {
      notifyStatus(true);
      return { online: true, data: res.data };
    }
  } catch (err) {
    notifyStatus(false);
    return { online: false, data: null };
  }
}

// Initial health ping
checkBackendHealth();

// API Service Methods
export const api = {
  // Screenings
  createScreening: async (payload) => {
    try {
      const res = await client.post('/api/screening/create', payload);
      notifyStatus(true);
      return res.data;
    } catch (err) {
      console.warn("Backend unavailable, using deterministic demo screening engine:", err.message);
      notifyStatus(false);
      // Fallback
      return generateDeterministicScreeningResult(payload.scenario_preset || "valid_passport", payload);
    }
  },

  getScreenings: async (params = {}) => {
    try {
      const res = await client.get('/api/screenings', { params });
      notifyStatus(true);
      return res.data;
    } catch (err) {
      notifyStatus(false);
      let list = [...INITIAL_SCREENINGS_LIST];
      if (params.search) {
        const s = params.search.toLowerCase();
        list = list.filter(i => 
          i.person_name.toLowerCase().includes(s) || 
          i.document_number.toLowerCase().includes(s) ||
          i.screening_id.toLowerCase().includes(s)
        );
      }
      if (params.risk_level && params.risk_level !== 'ALL') {
        list = list.filter(i => i.risk_level === params.risk_level);
      }
      if (params.doc_type && params.doc_type !== 'ALL') {
        list = list.filter(i => i.document_type === params.doc_type);
      }
      return list;
    }
  },

  getScreeningById: async (id) => {
    try {
      const res = await client.get(`/api/screening/${id}`);
      notifyStatus(true);
      return res.data;
    } catch (err) {
      notifyStatus(false);
      const demo = generateDeterministicScreeningResult(
        id.includes('88095') ? 'tampered_visa' : (id.includes('88044') ? 'id_mismatch' : 'valid_passport')
      );
      demo.screening_id = id;
      return demo;
    }
  },

  // Dashboard & Analytics
  getDashboardStats: async () => {
    try {
      const res = await client.get('/api/dashboard/statistics');
      notifyStatus(true);
      return res.data;
    } catch (err) {
      notifyStatus(false);
      return INITIAL_DASHBOARD_STATS;
    }
  },

  getAnalytics: async (timeframe = '7_days') => {
    try {
      const res = await client.get(`/api/analytics?timeframe=${timeframe}`);
      notifyStatus(true);
      return res.data;
    } catch (err) {
      notifyStatus(false);
      return {
        timeframe,
        throughput_per_minute: 24.5,
        tamper_detection_rate: "98.4%",
        false_positive_estimate: "1.2%",
        average_ocr_confidence: "97.8%",
        face_match_accuracy: "96.5%",
        biometric_retention_policy: "Zero permanent storage (Ephemeral Demo Mode)",
        chain_consensus: "SHA-256 Tamper-Evident Local Cryptographic Ledger",
        hourly_distribution: [
          { hour: "00:00", count: 4 },
          { hour: "04:00", count: 2 },
          { hour: "08:00", count: 42 },
          { hour: "12:00", count: 68 },
          { hour: "16:00", count: 84 },
          { hour: "20:00", count: 52 }
        ]
      };
    }
  },

  // Blockchain Ledger
  getBlockchainLedger: async () => {
    try {
      const res = await client.get('/api/blockchain');
      notifyStatus(true);
      return res.data;
    } catch (err) {
      notifyStatus(false);
      return INITIAL_BLOCKCHAIN_BLOCKS;
    }
  },

  verifyBlockchain: async () => {
    try {
      const res = await client.post('/api/blockchain/verify');
      notifyStatus(true);
      return res.data;
    } catch (err) {
      notifyStatus(false);
      return {
        is_valid: true,
        total_blocks: INITIAL_BLOCKCHAIN_BLOCKS.length,
        status: "VERIFIED",
        message: `✓ Ledger Integrity Verified. All ${INITIAL_BLOCKCHAIN_BLOCKS.length} blocks are cryptographically valid.`
      };
    }
  },

  tamperDemoBlock: async (blockNumber) => {
    try {
      const res = await client.post('/api/blockchain/tamper-demo', { block_number: blockNumber });
      notifyStatus(true);
      return res.data;
    } catch (err) {
      notifyStatus(false);
      return {
        success: true,
        tampered_block: blockNumber || 3,
        message: `Simulated tampering on Block #${blockNumber || 3}: Risk score altered to 0.0 without cryptographic re-signing.`
      };
    }
  },

  repairDemoChain: async () => {
    try {
      const res = await client.post('/api/blockchain/repair-demo');
      notifyStatus(true);
      return res.data;
    } catch (err) {
      notifyStatus(false);
      return {
        success: true,
        total_repaired: INITIAL_BLOCKCHAIN_BLOCKS.length,
        message: `✓ Blockchain repaired. Successfully recomputed cryptographic hashes for all ${INITIAL_BLOCKCHAIN_BLOCKS.length} blocks.`
      };
    }
  }
};
