#!/bin/bash
# =====================================================
# 🔋 TOKO ATHIFABATTERY - Termux Setup Script
# Jalankan: bash setup.sh
# =====================================================

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}╔══════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║     🔋 TOKO ATHIFABATTERY SETUP         ║${NC}"
echo -e "${YELLOW}╚══════════════════════════════════════════╝${NC}"
echo ""

# ── 1. Update Termux packages ──────────────────────
echo -e "${CYAN}[1/6] Update package list...${NC}"
pkg update -y && pkg upgrade -y

# ── 2. Install Node.js & git ──────────────────────
echo ""
echo -e "${CYAN}[2/6] Install Node.js, git, zip...${NC}"
pkg install -y nodejs git zip unzip

# Check node version
NODE_VER=$(node -v 2>/dev/null)
echo -e "${GREEN}✓ Node.js: $NODE_VER${NC}"

# ── 3. Install dependencies ───────────────────────
echo ""
echo -e "${CYAN}[3/6] Install npm dependencies...${NC}"
npm install

# ── 4. Setup .env.local ───────────────────────────
echo ""
echo -e "${CYAN}[4/6] Setup environment variables...${NC}"

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo -e "${YELLOW}⚠️  File .env.local dibuat dari .env.example${NC}"
  echo -e "${YELLOW}    Edit .env.local dan isi Supabase URL & Key!${NC}"
else
  echo -e "${GREEN}✓ .env.local sudah ada${NC}"
fi

# ── 5. Show .env.local ────────────────────────────
echo ""
echo -e "${CYAN}[5/6] Isi .env.local sekarang? (y/n)${NC}"
read -r EDIT_ENV
if [[ "$EDIT_ENV" =~ ^[Yy]$ ]]; then
  if command -v nano &>/dev/null; then
    nano .env.local
  elif command -v vi &>/dev/null; then
    vi .env.local
  else
    pkg install -y nano
    nano .env.local
  fi
fi

# ── 6. Done ───────────────────────────────────────
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         ✅ SETUP SELESAI!               ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}Perintah selanjutnya:${NC}"
echo ""
echo -e "  ${YELLOW}npm run dev${NC}      → Jalankan development server"
echo -e "  ${YELLOW}npm run build${NC}    → Build untuk production"
echo -e "  ${YELLOW}npm start${NC}        → Jalankan production server"
echo ""
echo -e "${CYAN}Buka browser:${NC} http://localhost:3000"
echo -e "${CYAN}Admin panel:${NC}  http://localhost:3000/admin"
echo ""
echo -e "${YELLOW}⚠️  JANGAN LUPA:${NC}"
echo -e "  1. Isi NEXT_PUBLIC_SUPABASE_URL di .env.local"
echo -e "  2. Isi NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local"
echo -e "  3. Jalankan supabase/schema.sql di Supabase SQL Editor"
echo -e "  4. Update koordinat toko di components/MapEmbed.tsx"
echo ""

# ── Auto run dev? ─────────────────────────────────
echo -e "${CYAN}Jalankan 'npm run dev' sekarang? (y/n)${NC}"
read -r RUN_DEV
if [[ "$RUN_DEV" =~ ^[Yy]$ ]]; then
  echo ""
  echo -e "${GREEN}🚀 Starting Athifabattery dev server...${NC}"
  npm run dev
fi
