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
  Chip,
  Surface,
  Modal,
  Portal,
  TextInput,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, styles } from '../theme/theme';
import { workerCategories } from '../data/farmData';

const WorkerScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('ploughing');
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [acres, setAcres] = useState('');
  const [days, setDays] = useState('');
  const [trackingActive, setTrackingActive] = useState(false);

  const categories = [
    { key: 'ploughing', name: 'Ploughing', icon: 'car-sport', color: theme.colors.primary },
    { key: 'sowing', name: 'Sowing', icon: 'flower', color: theme.colors.success },
    { key: 'harvest', name: 'Harvesting', icon: 'leaf', color: theme.colors.warning },
    { key: 'weeding', name: 'Weeding', icon: 'cut', color: theme.colors.secondary },
  ];

  const mockWorkers = [
    {
      id: 'W001',
      name: 'Lakshman Team',
      category: 'ploughing',
      rating: 4.8,
      experience: '5+ years',
      distance: '3.2 km',
      eta: '25 mins',
      available: true,
      teamSize: 4,
    },
    {
      id: 'W002',
      name: 'Krishna Group',
      category: 'ploughing',
      rating: 4.6,
      experience: '3+ years',
      distance: '4.1 km',
      eta: '30 mins',
      available: true,
      teamSize: 3,
    },
    {
      id: 'W003',
      name: 'Radha Workers',
      category: 'sowing',
      rating: 4.9,
      experience: '6+ years',
      distance: '2.8 km',
      eta: '20 mins',
      available: true,
      teamSize: 5,
    },
  ];

  const getCurrentCategory = () => workerCategories[selectedCategory];
  const getAvailableWorkers = () => mockWorkers.filter(w => w.category === selectedCategory);

  const calculateCost = () => {
    const category = getCurrentCategory();
    if (!category) return 0;
    
    const acresCost = acres ? parseFloat(acres) * category.pricePerAcre : 0;
    const daysCost = days ? parseFloat(days) * category.pricePerDay : 0;
    
    return Math.max(acresCost, daysCost);
  };

  const handleBooking = () => {
    if (!selectedWorker || (!acres && !days)) {
      Alert.alert('Error', 'Please select worker and enter area or days');
      return;
    }

    const cost = calculateCost();
    Alert.alert(
      'Confirm Booking',
      `Hire ${selectedWorker.name} for ${getCurrentCategory().name}\nCost: ₹${cost}\nTeam Size: ${selectedWorker.teamSize} workers\nETA: ${selectedWorker.eta}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Hire Now', 
          onPress: () => {
            setBookingModal(false);
            setTrackingActive(true);
            Alert.alert('Booking Confirmed!', 'Workers have been hired. Track their progress below.');
          }
        },
      ]
    );
  };

  const renderWorkerCard = (worker) => (
    <Card key={worker.id} style={localStyles.workerCard}>
      <Card.Content>
        <View style={localStyles.workerHeader}>
          <View style={localStyles.workerInfo}>
            <Text variant="titleSmall">{worker.name}</Text>
            <View style={localStyles.workerDetails}>
              <View style={localStyles.ratingContainer}>
                <Ionicons name="star" size={16} color={theme.colors.accent} />
                <Text variant="bodySmall" style={{ marginLeft: 4 }}>
                  {worker.rating}
                </Text>
              </View>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                • {worker.experience}
              </Text>
            </View>
          </View>
          <View style={localStyles.workerStatus}>
            <Text variant="bodySmall" style={{ color: theme.colors.success }}>
              {worker.distance} • {worker.eta}
            </Text>
            <Chip 
              mode="flat" 
              style={{ backgroundColor: theme.colors.success + '20' }}
              textStyle={{ color: theme.colors.success }}
            >
              Available
            </Chip>
          </View>
        </View>

        <View style={localStyles.teamInfo}>
          <View style={localStyles.teamDetail}>
            <Ionicons name="people" size={16} color={theme.colors.secondary} />
            <Text variant="bodySmall" style={localStyles.teamText}>
              Team of {worker.teamSize} workers
            </Text>
          </View>
          <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
            ₹{getCurrentCategory().pricePerDay}/day • ₹{getCurrentCategory().pricePerAcre}/acre
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={() => {
            setSelectedWorker(worker);
            setBookingModal(true);
          }}
          style={localStyles.hireButton}
        >
          Hire Team
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Category Selection */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={localStyles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              localStyles.categoryTab,
              selectedCategory === category.key && localStyles.activeCategoryTab,
              { borderColor: category.color }
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <Ionicons 
              name={category.icon} 
              size={24} 
              color={selectedCategory === category.key ? category.color : theme.colors.outline}
            />
            <Text 
              variant="bodyMedium"
              style={[
                localStyles.categoryText,
                { color: selectedCategory === category.key ? category.color : theme.colors.outline }
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Active Tracking */}
      {trackingActive && (
        <Card style={[localStyles.trackingCard, { backgroundColor: theme.colors.primary + '10' }]}>
          <Card.Content>
            <View style={localStyles.trackingHeader}>
              <Ionicons name="location" size={24} color={theme.colors.primary} />
              <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                Workers En Route
              </Text>
            </View>
            <Text variant="bodyMedium">
              {selectedWorker?.name} team is on the way
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              ETA: 20 minutes • Team of {selectedWorker?.teamSize} workers
            </Text>
            <View style={localStyles.trackingActions}>
              <Button 
                mode="outlined" 
                onPress={() => Alert.alert('Calling...', 'Connecting to team leader')}
                style={{ flex: 1, marginRight: 8 }}
              >
                Call Team
              </Button>
              <Button 
                mode="contained" 
                onPress={() => setTrackingActive(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Available Workers */}
      <ScrollView style={localStyles.content} showsVerticalScrollIndicator={false}>
        <Text variant="titleMedium" style={localStyles.sectionTitle}>
          Available {getCurrentCategory()?.name} Teams
        </Text>

        {getAvailableWorkers().map(renderWorkerCard)}

        {/* Pricing Info */}
        <Card style={localStyles.pricingCard}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
              Pricing Information
            </Text>
            <View style={localStyles.pricingRow}>
              <Text variant="bodyMedium">Per Day:</Text>
              <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
                ₹{getCurrentCategory()?.pricePerDay}
              </Text>
            </View>
            <View style={localStyles.pricingRow}>
              <Text variant="bodyMedium">Per Acre:</Text>
              <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
                ₹{getCurrentCategory()?.pricePerAcre}
              </Text>
            </View>
            <Text variant="bodySmall" style={{ color: theme.colors.outline, marginTop: theme.spacing.sm }}>
              * Prices include team leader and equipment
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Booking Modal */}
      <Portal>
        <Modal
          visible={bookingModal}
          onDismiss={() => setBookingModal(false)}
          contentContainerStyle={localStyles.modal}
        >
          <Text variant="titleLarge" style={{ marginBottom: theme.spacing.lg }}>
            Hire {getCurrentCategory()?.name} Team
          </Text>

          {selectedWorker && (
            <Surface style={localStyles.selectedWorker}>
              <Text variant="titleMedium">{selectedWorker.name}</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                Rating: {selectedWorker.rating} • Team: {selectedWorker.teamSize} workers • ETA: {selectedWorker.eta}
              </Text>
            </Surface>
          )}

          <TextInput
            label="Area (Acres)"
            value={acres}
            onChangeText={setAcres}
            keyboardType="numeric"
            style={localStyles.input}
            mode="outlined"
          />

          <Text variant="bodyMedium" style={localStyles.orText}>OR</Text>

          <TextInput
            label="Duration (Days)"
            value={days}
            onChangeText={setDays}
            keyboardType="numeric"
            style={localStyles.input}
            mode="outlined"
          />

          {(acres || days) && (
            <Surface style={localStyles.costPreview}>
              <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                Estimated Cost: ₹{calculateCost()}
              </Text>
            </Surface>
          )}

          <View style={localStyles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setBookingModal(false)}
              style={{ flex: 1, marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleBooking}
              style={{ flex: 1 }}
            >
              Confirm Hiring
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  categoriesContainer: {
    maxHeight: 80,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderWidth: 2,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    minWidth: 120,
  },
  activeCategoryTab: {
    backgroundColor: theme.colors.surface,
  },
  categoryText: {
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  trackingCard: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  trackingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  trackingActions: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  sectionTitle: {
    marginVertical: theme.spacing.md,
    color: theme.colors.text,
  },
  workerCard: {
    marginBottom: theme.spacing.md,
  },
  workerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  workerInfo: {
    flex: 1,
  },
  workerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerStatus: {
    alignItems: 'flex-end',
  },
  teamInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  teamDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.outline,
  },
  hireButton: {
    marginTop: theme.spacing.sm,
  },
  pricingCard: {
    marginVertical: theme.spacing.md,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  selectedWorker: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  orText: {
    textAlign: 'center',
    marginVertical: theme.spacing.sm,
    color: theme.colors.outline,
  },
  costPreview: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary + '10',
    marginBottom: theme.spacing.md,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
  },
});

export default WorkerScreen;