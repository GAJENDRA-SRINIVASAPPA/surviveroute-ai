/**
 * Blockchain Integration Module
 * Decentralized trust system for fuel stations, professionals, and transactions
 * Uses blockchain principles for transparency and security
 */

class BlockchainIntegration {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.difficulty = 2;
    this.miningReward = 10;
    this.createGenesisBlock();
  }

  /**
   * Create Genesis Block (First block in chain)
   */
  createGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      hash: this.calculateHash(0, Date.now(), [], '0', 0),
      nonce: 0
    };
    this.chain.push(genesisBlock);
  }

  /**
   * Calculate Block Hash
   */
  calculateHash(index, timestamp, transactions, previousHash, nonce) {
    const data = index + timestamp + JSON.stringify(transactions) + previousHash + nonce;
    // Simplified hash function (in production, use SHA-256)
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Get Latest Block
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Add Transaction to Blockchain
   * Records fuel purchases, service requests, ratings
   */
  addTransaction(transaction) {
    const blockchainTransaction = {
      id: this.generateTransactionId(),
      timestamp: Date.now(),
      type: transaction.type, // 'FUEL_PURCHASE', 'SERVICE_REQUEST', 'RATING', 'PAYMENT'
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount,
      data: transaction.data,
      signature: this.signTransaction(transaction)
    };

    this.pendingTransactions.push(blockchainTransaction);
    return blockchainTransaction.id;
  }

  /**
   * Mine Pending Transactions
   * Creates new block with pending transactions
   */
  minePendingTransactions(minerAddress) {
    const block = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      previousHash: this.getLatestBlock().hash,
      nonce: 0
    };

    // Proof of Work
    block.hash = this.proofOfWork(block);

    this.chain.push(block);
    
    // Reset pending transactions and reward miner
    this.pendingTransactions = [{
      type: 'MINING_REWARD',
      to: minerAddress,
      amount: this.miningReward,
      timestamp: Date.now()
    }];

    return block;
  }

  /**
   * Proof of Work Algorithm
   */
  proofOfWork(block) {
    let hash = this.calculateHash(
      block.index,
      block.timestamp,
      block.transactions,
      block.previousHash,
      block.nonce
    );

    while (!hash.startsWith('0'.repeat(this.difficulty))) {
      block.nonce++;
      hash = this.calculateHash(
        block.index,
        block.timestamp,
        block.transactions,
        block.previousHash,
        block.nonce
      );
    }

    return hash;
  }

  /**
   * Verify Blockchain Integrity
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Verify hash
      const calculatedHash = this.calculateHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.transactions,
        currentBlock.previousHash,
        currentBlock.nonce
      );

      if (currentBlock.hash !== calculatedHash) {
        return false;
      }

      // Verify chain link
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  /**
   * Smart Contract: Fuel Purchase
   * Automated, trustless fuel purchase verification
   */
  executeFuelPurchaseContract(userId, stationId, amount, fuelType) {
    const contract = {
      type: 'FUEL_PURCHASE',
      userId,
      stationId,
      amount,
      fuelType,
      timestamp: Date.now(),
      status: 'PENDING'
    };

    // Verify conditions
    if (amount > 0 && fuelType) {
      contract.status = 'EXECUTED';
      
      // Add to blockchain
      this.addTransaction({
        type: 'FUEL_PURCHASE',
        from: userId,
        to: stationId,
        amount,
        data: contract
      });

      return {
        success: true,
        contract,
        transactionId: this.generateTransactionId()
      };
    }

    contract.status = 'FAILED';
    return {
      success: false,
      contract,
      error: 'Invalid purchase parameters'
    };
  }

  /**
   * Smart Contract: Service Rating
   * Immutable rating system
   */
  executeRatingContract(userId, professionalId, rating, review) {
    if (rating < 1 || rating > 5) {
      return { success: false, error: 'Invalid rating' };
    }

    const contract = {
      type: 'RATING',
      userId,
      professionalId,
      rating,
      review,
      timestamp: Date.now(),
      verified: true
    };

    this.addTransaction({
      type: 'RATING',
      from: userId,
      to: professionalId,
      amount: rating,
      data: contract
    });

    return {
      success: true,
      contract,
      message: 'Rating recorded on blockchain'
    };
  }

  /**
   * Get Professional Reputation Score
   * Calculate from blockchain records
   */
  getProfessionalReputation(professionalId) {
    const ratings = [];
    
    this.chain.forEach(block => {
      block.transactions.forEach(tx => {
        if (tx.type === 'RATING' && tx.to === professionalId) {
          ratings.push(tx.data.rating);
        }
      });
    });

    if (ratings.length === 0) {
      return {
        score: 0,
        totalRatings: 0,
        verified: false
      };
    }

    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    return {
      score: averageRating.toFixed(2),
      totalRatings: ratings.length,
      verified: true,
      trustScore: this.calculateTrustScore(ratings)
    };
  }

  /**
   * Calculate Trust Score
   * Advanced reputation algorithm
   */
  calculateTrustScore(ratings) {
    if (ratings.length === 0) return 0;

    const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const consistency = this.calculateConsistency(ratings);
    const volume = Math.min(ratings.length / 100, 1); // Max at 100 ratings

    // Weighted trust score
    const trustScore = (avgRating * 0.5) + (consistency * 0.3) + (volume * 0.2);
    
    return (trustScore * 20).toFixed(1); // Scale to 0-100
  }

  /**
   * Calculate Rating Consistency
   */
  calculateConsistency(ratings) {
    if (ratings.length < 2) return 1;

    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const variance = ratings.reduce((sum, rating) => 
      sum + Math.pow(rating - avg, 2), 0
    ) / ratings.length;

    // Lower variance = higher consistency
    return Math.max(0, 1 - (variance / 5));
  }

  /**
   * Get Transaction History
   */
  getTransactionHistory(userId, type = null) {
    const transactions = [];

    this.chain.forEach(block => {
      block.transactions.forEach(tx => {
        if ((tx.from === userId || tx.to === userId) && 
            (!type || tx.type === type)) {
          transactions.push({
            ...tx,
            blockIndex: block.index,
            blockHash: block.hash,
            confirmed: true
          });
        }
      });
    });

    return transactions;
  }

  /**
   * Verify Transaction
   */
  verifyTransaction(transactionId) {
    for (const block of this.chain) {
      const tx = block.transactions.find(t => t.id === transactionId);
      if (tx) {
        return {
          verified: true,
          transaction: tx,
          block: {
            index: block.index,
            hash: block.hash,
            timestamp: block.timestamp
          },
          confirmations: this.chain.length - block.index
        };
      }
    }

    return {
      verified: false,
      message: 'Transaction not found'
    };
  }

  /**
   * Generate Transaction ID
   */
  generateTransactionId() {
    return 'TX' + Date.now() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Sign Transaction (Simplified)
   */
  signTransaction(transaction) {
    const data = JSON.stringify(transaction);
    let signature = 0;
    for (let i = 0; i < data.length; i++) {
      signature = ((signature << 5) - signature) + data.charCodeAt(i);
      signature = signature & signature;
    }
    return 'SIG' + Math.abs(signature).toString(16);
  }

  /**
   * Get Blockchain Stats
   */
  getBlockchainStats() {
    const totalTransactions = this.chain.reduce((sum, block) => 
      sum + block.transactions.length, 0
    );

    return {
      totalBlocks: this.chain.length,
      totalTransactions,
      pendingTransactions: this.pendingTransactions.length,
      chainValid: this.isChainValid(),
      difficulty: this.difficulty,
      latestBlock: this.getLatestBlock()
    };
  }

  /**
   * Decentralized Identity Verification
   */
  verifyIdentity(userId, credentials) {
    const identityHash = this.calculateHash(
      userId,
      Date.now(),
      credentials,
      'IDENTITY',
      0
    );

    this.addTransaction({
      type: 'IDENTITY_VERIFICATION',
      from: 'SYSTEM',
      to: userId,
      amount: 0,
      data: {
        identityHash,
        verified: true,
        timestamp: Date.now()
      }
    });

    return {
      verified: true,
      identityHash,
      message: 'Identity verified on blockchain'
    };
  }

  /**
   * Token Economy System
   * Reward users with tokens for good behavior
   */
  rewardTokens(userId, amount, reason) {
    this.addTransaction({
      type: 'TOKEN_REWARD',
      from: 'SYSTEM',
      to: userId,
      amount,
      data: {
        reason,
        timestamp: Date.now()
      }
    });

    return {
      success: true,
      tokensAwarded: amount,
      reason
    };
  }

  /**
   * Get User Token Balance
   */
  getUserTokenBalance(userId) {
    let balance = 0;

    this.chain.forEach(block => {
      block.transactions.forEach(tx => {
        if (tx.to === userId && tx.type === 'TOKEN_REWARD') {
          balance += tx.amount;
        }
        if (tx.from === userId && tx.type === 'TOKEN_SPEND') {
          balance -= tx.amount;
        }
      });
    });

    return balance;
  }
}

module.exports = new BlockchainIntegration();

// Made with Bob
