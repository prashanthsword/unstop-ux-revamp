import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  Chip,
  Surface,
  TextInput,
  Modal,
  Portal,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, styles } from '../theme/theme';
import { machineryPricing, farmerProfile } from '../data/farmData';

const { width } = Dimensions.get('window');

const MachineryScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('tractor');
  const [selectedMachinery, setSelectedMachinery] = useState(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [acres, setAcres] = useState('');
  const [hours, setHours] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [trackingActive, setTrackingActive] = useState(false);

  const machineryTabs = [
    { key: 'tractor', label: 'Tractors', icon: 'car-sport' },
    { key: 'jcb', label: 'JCBs', icon: 'build' },
    { key: 'harvester', label: 'Harvesters', icon: 'leaf' },
    { key: 'borewellRig', label: 'Borewell', icon: 'water' },
  ];

  const mockVehicles = [
    {
      id: 'T001',
      type: 'tractor',
      operator: 'Suresh Kumar',
      rating: 4.8,
      distance: '2.3 km',
      eta: '15 mins',
      location: { lat: 17.9689, lng: 79.5941 },
      available: true,
    },
    {
      id: 'T002',
      type: 'tractor',
      operator: 'Mahesh Reddy',
      rating: 4.6,
      distance: '3.1 km',
      eta: '20 mins',
      location: { lat: 17.9689, lng: 79.5941 },
      available: true,
    },
    {
      id: 'J001',
      type: 'jcb',
      operator: 'Ramesh Singh',
      rating: 4.9,
      distance: '1.8 km',
      eta: '12 mins',
      location: { lat: 17.9689, lng: 79.5941 },
      available: true,
    },
  ];

  const getCurrentMachinery = () => machineryPricing[selectedTab];
  const getAvailableVehicles = () => mockVehicles.filter(v => v.type === selectedTab);

  const calculateCost = () => {
    const machinery = getCurrentMachinery();
    if (!machinery) return 0;
    
    const acresCost = acres ? parseFloat(acres) * machinery.pricePerAcre : 0;
    const hoursCost = hours ? parseFloat(hours) * machinery.pricePerHour : 0;
    
    return Math.max(acresCost, hoursCost);
  };

  const handleBooking = () => {
    if (!selectedMachinery || (!acres && !hours)) {
      Alert.alert('Error', 'Please select machinery and enter area or hours');
      return;
    }

    const cost = calculateCost();
    Alert.alert(
      'Confirm Booking',
      `Book ${getCurrentMachinery().name} with ${selectedMachinery.operator}\nCost: ₹${cost}\nETA: ${selectedMachinery.eta}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            setBookingModal(false);
            setTrackingActive(true);
            Alert.alert('Booking Confirmed!', 'Your machinery has been booked. Track progress below.');
          }
        },
      ]
    );
  };

  const renderMachineryCard = (vehicle) => (
    <Card key={vehicle.id} style={localStyles.vehicleCard}>
      <Card.Content>
        <View style={localStyles.vehicleHeader}>
          <View style={localStyles.operatorInfo}>
            <Text variant="titleSmall">{vehicle.operator}</Text>
            <View style={localStyles.ratingContainer}>
              <Ionicons name="star" size={16} color={theme.colors.accent} />
              <Text variant="bodySmall" style={{ marginLeft: 4 }}>
                {vehicle.rating}
              </Text>
            </View>
          </View>
          <View style={localStyles.vehicleStatus}>
            <Text variant="bodySmall" style={{ color: theme.colors.success }}>
              {vehicle.distance} • {vehicle.eta}
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

        <View style={localStyles.pricingInfo}>
          <Text variant="bodyMedium">
            ₹{getCurrentMachinery().pricePerHour}/hour • ₹{getCurrentMachinery().pricePerAcre}/acre
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={() => {
            setSelectedMachinery(vehicle);
            setBookingModal(true);
          }}
          style={localStyles.bookButton}
        >
          Book Now
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Machinery Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={localStyles.tabsContainer}
      >
        {machineryTabs.map((tab) => (
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
              size={24} 
              color={selectedTab === tab.key ? theme.colors.onPrimary : theme.colors.outline}
            />
            <Text 
              variant="bodyMedium"
              style={[
                localStyles.tabText,
                { color: selectedTab === tab.key ? theme.colors.onPrimary : theme.colors.outline }
              ]}
            >
              {tab.label}
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
                Tracking Active
              </Text>
            </View>
            <Text variant="bodyMedium">
              {selectedMachinery?.operator} is on the way
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              ETA: 12 minutes • Distance: 1.8 km
            </Text>
            <View style={localStyles.trackingActions}>
              <Button 
                mode="outlined" 
                onPress={() => Alert.alert('Calling...', 'Connecting to operator')}
                style={{ flex: 1, marginRight: 8 }}
              >
                Call
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

      {/* Available Machinery */}
      <ScrollView style={localStyles.content} showsVerticalScrollIndicator={false}>
        <Text variant="titleMedium" style={localStyles.sectionTitle}>
          Available {getCurrentMachinery()?.name}s
        </Text>

        {getAvailableVehicles().map(renderMachineryCard)}

        {/* Pricing Info */}
        <Card style={localStyles.pricingCard}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
              Pricing Information
            </Text>
            <View style={localStyles.pricingRow}>
              <Text variant="bodyMedium">Per Hour:</Text>
              <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
                ₹{getCurrentMachinery()?.pricePerHour}
              </Text>
            </View>
            <View style={localStyles.pricingRow}>
              <Text variant="bodyMedium">Per Acre:</Text>
              <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
                ₹{getCurrentMachinery()?.pricePerAcre}
              </Text>
            </View>
            <Divider style={{ marginVertical: theme.spacing.sm }} />
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              * Minimum booking: 2 hours or 1 acre
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
            Book {getCurrentMachinery()?.name}
          </Text>

          {selectedMachinery && (
            <Surface style={localStyles.selectedVehicle}>
              <Text variant="titleMedium">{selectedMachinery.operator}</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                Rating: {selectedMachinery.rating} • ETA: {selectedMachinery.eta}
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
            label="Duration (Hours)"
            value={hours}
            onChangeText={setHours}
            keyboardType="numeric"
            style={localStyles.input}
            mode="outlined"
          />

          <TextInput
            label="Preferred Date"
            value={selectedDate}
            onChangeText={setSelectedDate}
            style={localStyles.input}
            mode="outlined"
          />

          {(acres || hours) && (
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
              Confirm Booking
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  tabsContainer: {
    maxHeight: 80,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    minWidth: 100,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
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
  vehicleCard: {
    marginBottom: theme.spacing.md,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  operatorInfo: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  vehicleStatus: {
    alignItems: 'flex-end',
  },
  pricingInfo: {
    marginBottom: theme.spacing.md,
  },
  bookButton: {
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
  selectedVehicle: {
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

export default MachineryScreen;