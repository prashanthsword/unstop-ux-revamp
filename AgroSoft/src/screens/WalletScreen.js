import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  ProgressBar,
  Chip,
  Surface,
  TextInput,
  Modal,
  Portal,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, styles } from '../theme/theme';
import { farmerProfile } from '../data/farmData';

const WalletScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('wallet');
  const [addMoneyModal, setAddMoneyModal] = useState(false);
  const [creditModal, setCreditModal] = useState(false);
  const [amount, setAmount] = useState('');

  const tabs = [
    { key: 'wallet', name: 'Wallet', icon: 'wallet' },
    { key: 'credit', name: 'Credit', icon: 'card' },
    { key: 'transactions', name: 'History', icon: 'time' },
  ];

  const transactions = [
    { id: 'T001', type: 'credit', amount: 5000, description: 'Tractor booking payment', date: '2024-01-20', status: 'completed' },
    { id: 'T002', type: 'debit', amount: 1200, description: 'Soil test payment', date: '2024-01-19', status: 'completed' },
    { id: 'T003', type: 'credit', amount: 25000, description: 'Paddy sale to AgriMart', date: '2024-01-18', status: 'completed' },
    { id: 'T004', type: 'debit', amount: 800, description: 'Drone spraying service', date: '2024-01-17', status: 'completed' },
  ];

  const creditScore = farmerProfile.creditScore;
  const getCreditScoreColor = (score) => {
    if (score >= 750) return theme.colors.success;
    if (score >= 650) return theme.colors.warning;
    return theme.colors.error;
  };

  const getCreditScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    return 'Fair';
  };

  const handleAddMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    Alert.alert(
      'Add Money',
      `Add ₹${amount} to your wallet?\nPayment method: UPI/Card`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Proceed', 
          onPress: () => {
            setAddMoneyModal(false);
            setAmount('');
            Alert.alert('Success!', 'Money added to wallet successfully');
          }
        },
      ]
    );
  };

  const handleCreditApplication = () => {
    Alert.alert(
      'Apply for Credit',
      `Apply for additional credit based on your yield data?\nCurrent limit: ₹${farmerProfile.creditLimit.toLocaleString()}\nProposed increase: ₹${(farmerProfile.creditLimit * 0.2).toLocaleString()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply', 
          onPress: () => {
            setCreditModal(false);
            Alert.alert('Application Submitted!', 'Your credit application is under review. You will be notified within 24 hours.');
          }
        },
      ]
    );
  };

  const renderWalletTab = () => (
    <View>
      {/* Wallet Balance */}
      <Card style={[styles.card, { marginTop: theme.spacing.md }]}>
        <Card.Content>
          <View style={localStyles.balanceHeader}>
            <Ionicons name="wallet" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
              Wallet Balance
            </Text>
          </View>
          
          <Text variant="headlineLarge" style={[localStyles.balanceAmount, { color: theme.colors.primary }]}>
            ₹{farmerProfile.walletBalance.toLocaleString()}
          </Text>
          
          <View style={localStyles.walletActions}>
            <Button
              mode="contained"
              onPress={() => setAddMoneyModal(true)}
              style={{ flex: 1, marginRight: 8 }}
            >
              Add Money
            </Button>
            <Button
              mode="outlined"
              onPress={() => Alert.alert('Send Money', 'Feature coming soon!')}
              style={{ flex: 1 }}
            >
              Send Money
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Pay */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Quick Pay
          </Text>
          
          <View style={localStyles.quickPayGrid}>
            {[
              { name: 'Mobile Recharge', icon: 'phone-portrait', color: theme.colors.secondary },
              { name: 'DTH Recharge', icon: 'tv', color: theme.colors.success },
              { name: 'Electricity Bill', icon: 'flash', color: theme.colors.warning },
              { name: 'Water Bill', icon: 'water', color: theme.colors.info },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={localStyles.quickPayItem}>
                <Ionicons name={item.icon} size={24} color={item.color} />
                <Text variant="bodySmall" style={localStyles.quickPayText}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderCreditTab = () => (
    <View>
      {/* Credit Score */}
      <Card style={[styles.card, { marginTop: theme.spacing.md }]}>
        <Card.Content>
          <View style={localStyles.creditHeader}>
            <Ionicons name="analytics" size={24} color={getCreditScoreColor(creditScore)} />
            <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
              Credit Score
            </Text>
          </View>
          
          <View style={localStyles.creditScoreContainer}>
            <Text variant="headlineLarge" style={[localStyles.creditScore, { color: getCreditScoreColor(creditScore) }]}>
              {creditScore}
            </Text>
            <Chip 
              mode="flat" 
              style={[localStyles.creditLabel, { backgroundColor: getCreditScoreColor(creditScore) + '20' }]}
              textStyle={{ color: getCreditScoreColor(creditScore) }}
            >
              {getCreditScoreLabel(creditScore)}
            </Chip>
          </View>
          
          <ProgressBar 
            progress={creditScore / 850} 
            color={getCreditScoreColor(creditScore)}
            style={localStyles.creditProgressBar}
          />
        </Card.Content>
      </Card>

      {/* Credit Details */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Credit Information
          </Text>
          
          <View style={localStyles.creditRow}>
            <Text variant="bodyMedium">Credit Limit:</Text>
            <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
              ₹{farmerProfile.creditLimit.toLocaleString()}
            </Text>
          </View>
          
          <View style={localStyles.creditRow}>
            <Text variant="bodyMedium">Outstanding Amount:</Text>
            <Text variant="titleSmall" style={{ color: theme.colors.error }}>
              ₹{farmerProfile.outstandingCredit.toLocaleString()}
            </Text>
          </View>
          
          <View style={localStyles.creditRow}>
            <Text variant="bodyMedium">Available Credit:</Text>
            <Text variant="titleSmall" style={{ color: theme.colors.success }}>
              ₹{(farmerProfile.creditLimit - farmerProfile.outstandingCredit).toLocaleString()}
            </Text>
          </View>
          
          <Divider style={{ marginVertical: theme.spacing.md }} />
          
          <Button
            mode="contained"
            onPress={() => setCreditModal(true)}
            style={{ marginTop: theme.spacing.sm }}
          >
            Apply for More Credit
          </Button>
        </Card.Content>
      </Card>

      {/* Yield-Based Scoring */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={localStyles.yieldHeader}>
            <Ionicons name="trending-up" size={24} color={theme.colors.success} />
            <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
              Yield-Based Credit Factors
            </Text>
          </View>
          
          <Text variant="bodyMedium" style={{ marginBottom: theme.spacing.md, color: theme.colors.outline }}>
            Your credit limit is calculated based on historical yield data
          </Text>
          
          {Object.entries(farmerProfile.totalYield).map(([year, yields]) => (
            <Surface key={year} style={localStyles.yieldCard}>
              <Text variant="titleSmall">Yield {year}</Text>
              <View style={localStyles.yieldDetails}>
                {Object.entries(yields).map(([crop, amount]) => (
                  <Text key={crop} variant="bodySmall" style={{ color: theme.colors.outline }}>
                    {crop}: {amount} kg
                  </Text>
                ))}
              </View>
              <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
                Total Value: ₹{Object.values(yields).reduce((sum, val) => sum + val * 25, 0).toLocaleString()}
              </Text>
            </Surface>
          ))}
        </Card.Content>
      </Card>
    </View>
  );

  const renderTransactionsTab = () => (
    <View>
      <Text variant="titleMedium" style={localStyles.sectionTitle}>
        Recent Transactions
      </Text>
      
      {transactions.map((transaction) => (
        <Card key={transaction.id} style={localStyles.transactionCard}>
          <Card.Content>
            <View style={localStyles.transactionHeader}>
              <View style={localStyles.transactionInfo}>
                <Ionicons 
                  name={transaction.type === 'credit' ? 'arrow-down' : 'arrow-up'} 
                  size={20} 
                  color={transaction.type === 'credit' ? theme.colors.success : theme.colors.error}
                />
                <View style={localStyles.transactionDetails}>
                  <Text variant="bodyMedium">{transaction.description}</Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                    {transaction.date}
                  </Text>
                </View>
              </View>
              <View style={localStyles.transactionAmount}>
                <Text 
                  variant="titleSmall" 
                  style={{ 
                    color: transaction.type === 'credit' ? theme.colors.success : theme.colors.error 
                  }}
                >
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                </Text>
                <Chip 
                  mode="flat" 
                  style={{ backgroundColor: theme.colors.success + '20' }}
                  textStyle={{ color: theme.colors.success }}
                >
                  {transaction.status}
                </Chip>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={localStyles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              localStyles.tab,
              selectedTab === tab.key && localStyles.activeTab
            ]}
            onPress={() => setSelectedTab(tab.key)}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={selectedTab === tab.key ? theme.colors.onPrimary : theme.colors.outline}
            />
            <Text 
              variant="bodyMedium"
              style={[
                localStyles.tabText,
                { color: selectedTab === tab.key ? theme.colors.onPrimary : theme.colors.outline }
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={localStyles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'wallet' && renderWalletTab()}
        {selectedTab === 'credit' && renderCreditTab()}
        {selectedTab === 'transactions' && renderTransactionsTab()}
      </ScrollView>

      {/* Add Money Modal */}
      <Portal>
        <Modal
          visible={addMoneyModal}
          onDismiss={() => setAddMoneyModal(false)}
          contentContainerStyle={localStyles.modal}
        >
          <Text variant="titleLarge" style={{ marginBottom: theme.spacing.lg }}>
            Add Money to Wallet
          </Text>

          <TextInput
            label="Amount (₹)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={localStyles.input}
            mode="outlined"
          />

          <Text variant="bodyMedium" style={{ marginBottom: theme.spacing.md, color: theme.colors.outline }}>
            Payment methods: UPI, Debit Card, Net Banking
          </Text>

          <View style={localStyles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setAddMoneyModal(false)}
              style={{ flex: 1, marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleAddMoney}
              style={{ flex: 1 }}
            >
              Add Money
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Credit Application Modal */}
      <Portal>
        <Modal
          visible={creditModal}
          onDismiss={() => setCreditModal(false)}
          contentContainerStyle={localStyles.modal}
        >
          <Text variant="titleLarge" style={{ marginBottom: theme.spacing.lg }}>
            Apply for Additional Credit
          </Text>

          <Surface style={localStyles.creditPreview}>
            <Text variant="bodyMedium">Current Credit Limit: ₹{farmerProfile.creditLimit.toLocaleString()}</Text>
            <Text variant="bodyMedium">Proposed Increase: ₹{(farmerProfile.creditLimit * 0.2).toLocaleString()}</Text>
            <Text variant="titleMedium" style={{ color: theme.colors.primary, marginTop: 8 }}>
              New Limit: ₹{(farmerProfile.creditLimit * 1.2).toLocaleString()}
            </Text>
          </Surface>

          <Text variant="bodyMedium" style={{ marginBottom: theme.spacing.md, color: theme.colors.outline }}>
            Based on your excellent yield history and credit score of {creditScore}, you are eligible for increased credit.
          </Text>

          <View style={localStyles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setCreditModal(false)}
              style={{ flex: 1, marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleCreditApplication}
              style={{ flex: 1 }}
            >
              Apply Now
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  balanceAmount: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  walletActions: {
    flexDirection: 'row',
  },
  quickPayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickPayItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
  },
  quickPayText: {
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  creditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  creditScoreContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  creditScore: {
    marginBottom: theme.spacing.sm,
  },
  creditLabel: {
    marginBottom: theme.spacing.sm,
  },
  creditProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  creditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  yieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  yieldCard: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.sm,
  },
  yieldDetails: {
    marginVertical: theme.spacing.sm,
  },
  sectionTitle: {
    marginVertical: theme.spacing.md,
    color: theme.colors.text,
  },
  transactionCard: {
    marginBottom: theme.spacing.sm,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionDetails: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  modal: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  creditPreview: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
  },
});

export default WalletScreen;