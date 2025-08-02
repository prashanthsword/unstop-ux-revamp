import React, { useState } from 'react';
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
  Modal,
  Portal,
  ProgressBar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, styles } from '../theme/theme';
import { droneServices, farmerProfile } from '../data/farmData';

const { width } = Dimensions.get('window');

const DroneScreen = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState('spraying');
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState('Plot A');
  const [scanResults, setScanResults] = useState({
    overallHealth: 82,
    diseaseDetected: ['Leaf Blight', 'Aphid Infestation'],
    healthyAreas: 75,
    affectedAreas: 25,
    recommendations: [
      'Apply fungicide in affected areas',
      'Increase irrigation in Plot B',
      'Monitor for pest spread'
    ]
  });

  const services = [
    { key: 'spraying', name: 'Drone Spraying', icon: 'airplane', color: theme.colors.primary },
    { key: 'imaging', name: 'Crop Health Scan', icon: 'camera', color: theme.colors.secondary },
  ];

  const plots = ['Plot A', 'Plot B', 'Plot C'];

  const mockDrones = [
    {
      id: 'D001',
      operator: 'AgroTech Drones',
      rating: 4.9,
      distance: '1.2 km',
      eta: '8 mins',
      available: true,
    },
    {
      id: 'D002',
      operator: 'SkyFarm Solutions',
      rating: 4.7,
      distance: '2.5 km',
      eta: '12 mins',
      available: true,
    },
  ];

  const handleBooking = () => {
    const service = droneServices[selectedService];
    Alert.alert(
      'Confirm Booking',
      `Book ${service.name} for ${selectedPlot}\nCost: ₹${service.pricePerAcre} per acre\nDuration: ${service.duration}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            setBookingModal(false);
            Alert.alert('Booking Confirmed!', 'Drone service has been scheduled. You will receive real-time updates.');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Service Selection */}
      <View style={localStyles.servicesContainer}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.key}
            style={[
              localStyles.serviceTab,
              selectedService === service.key && localStyles.activeServiceTab,
              { borderColor: service.color }
            ]}
            onPress={() => setSelectedService(service.key)}
          >
            <Ionicons 
              name={service.icon} 
              size={24} 
              color={selectedService === service.key ? service.color : theme.colors.outline}
            />
            <Text 
              variant="bodyMedium"
              style={[
                localStyles.serviceText,
                { color: selectedService === service.key ? service.color : theme.colors.outline }
              ]}
            >
              {service.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* AI Crop Health Results (for imaging service) */}
      {selectedService === 'imaging' && (
        <Card style={[styles.card, { marginTop: theme.spacing.md }]}>
          <Card.Content>
            <View style={localStyles.header}>
              <Ionicons name="analytics" size={24} color={theme.colors.success} />
              <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
                Latest AI Crop Analysis
              </Text>
            </View>

            <View style={localStyles.healthOverview}>
              <View style={localStyles.healthScore}>
                <Text variant="headlineMedium" style={{ color: theme.colors.success }}>
                  {scanResults.overallHealth}%
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  Overall Health
                </Text>
              </View>
              
              <View style={localStyles.healthBreakdown}>
                <View style={localStyles.healthItem}>
                  <Text variant="bodyMedium">Healthy Areas</Text>
                  <Text variant="titleSmall" style={{ color: theme.colors.success }}>
                    {scanResults.healthyAreas}%
                  </Text>
                </View>
                <View style={localStyles.healthItem}>
                  <Text variant="bodyMedium">Affected Areas</Text>
                  <Text variant="titleSmall" style={{ color: theme.colors.error }}>
                    {scanResults.affectedAreas}%
                  </Text>
                </View>
              </View>
            </View>

            <ProgressBar 
              progress={scanResults.overallHealth / 100} 
              color={theme.colors.success}
              style={localStyles.progressBar}
            />

            <Text variant="titleSmall" style={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.sm }}>
              Detected Issues
            </Text>
            <View style={localStyles.issuesContainer}>
              {scanResults.diseaseDetected.map((disease, index) => (
                <Chip 
                  key={index}
                  mode="flat" 
                  style={[localStyles.diseaseChip, { backgroundColor: theme.colors.error + '20' }]}
                  textStyle={{ color: theme.colors.error }}
                >
                  {disease}
                </Chip>
              ))}
            </View>

            <Surface style={localStyles.ndviPreview}>
              <Text variant="titleSmall" style={{ color: theme.colors.secondary }}>
                NDVI Analysis Results
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline, marginTop: 4 }}>
                Vegetation Index: 0.75 (Good) • Coverage: 92%
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                Last scan: 1 day ago • Resolution: 2cm/pixel
              </Text>
            </Surface>
          </Card.Content>
        </Card>
      )}

      {/* Service Details */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            {droneServices[selectedService].name}
          </Text>
          
          <View style={localStyles.serviceDetails}>
            <View style={localStyles.detailRow}>
              <Ionicons name="pricetag" size={20} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={localStyles.detailText}>
                ₹{droneServices[selectedService].pricePerAcre} per acre
              </Text>
            </View>
            
            <View style={localStyles.detailRow}>
              <Ionicons name="time" size={20} color={theme.colors.secondary} />
              <Text variant="bodyMedium" style={localStyles.detailText}>
                {droneServices[selectedService].duration}
              </Text>
            </View>
            
            {selectedService === 'spraying' && (
              <View style={localStyles.detailRow}>
                <Ionicons name="water" size={20} color={theme.colors.accent} />
                <Text variant="bodyMedium" style={localStyles.detailText}>
                  Coverage: {droneServices[selectedService].coverage}
                </Text>
              </View>
            )}
            
            {selectedService === 'imaging' && (
              <View style={localStyles.detailRow}>
                <Ionicons name="document-text" size={20} color={theme.colors.info} />
                <Text variant="bodyMedium" style={localStyles.detailText}>
                  Report: {droneServices[selectedService].reportTime}
                </Text>
              </View>
            )}
          </View>

          {selectedService === 'spraying' && (
            <View style={localStyles.chemicalsSection}>
              <Text variant="titleSmall" style={{ marginBottom: theme.spacing.sm }}>
                Available Chemicals
              </Text>
              <View style={localStyles.chemicalsContainer}>
                {droneServices[selectedService].chemicals.map((chemical, index) => (
                  <Chip key={index} mode="outlined" style={localStyles.chemicalChip}>
                    {chemical}
                  </Chip>
                ))}
              </View>
            </View>
          )}

          {selectedService === 'imaging' && (
            <View style={localStyles.featuresSection}>
              <Text variant="titleSmall" style={{ marginBottom: theme.spacing.sm }}>
                Analysis Features
              </Text>
              <View style={localStyles.featuresContainer}>
                {droneServices[selectedService].features.map((feature, index) => (
                  <View key={index} style={localStyles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                    <Text variant="bodySmall" style={localStyles.featureText}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Available Drones */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Available Drones
          </Text>
          
          {mockDrones.map((drone, index) => (
            <Surface key={drone.id} style={localStyles.droneCard}>
              <View style={localStyles.droneHeader}>
                <View style={localStyles.droneInfo}>
                  <Text variant="titleSmall">{drone.operator}</Text>
                  <View style={localStyles.ratingContainer}>
                    <Ionicons name="star" size={16} color={theme.colors.accent} />
                    <Text variant="bodySmall" style={{ marginLeft: 4 }}>
                      {drone.rating}
                    </Text>
                  </View>
                </View>
                <View style={localStyles.droneStatus}>
                  <Text variant="bodySmall" style={{ color: theme.colors.success }}>
                    {drone.distance} • {drone.eta}
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
              
              <Button
                mode="contained"
                onPress={() => setBookingModal(true)}
                style={{ marginTop: theme.spacing.sm }}
              >
                Book {droneServices[selectedService].name}
              </Button>
            </Surface>
          ))}
        </Card.Content>
      </Card>

      {/* AI Recommendations (for imaging) */}
      {selectedService === 'imaging' && (
        <Card style={[styles.card, { marginBottom: theme.spacing.xl }]}>
          <Card.Content>
            <View style={localStyles.header}>
              <Ionicons name="bulb" size={24} color={theme.colors.warning} />
              <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
                AI Recommendations
              </Text>
            </View>

            {scanResults.recommendations.map((recommendation, index) => (
              <View key={index} style={localStyles.recommendationItem}>
                <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
                <Text variant="bodyMedium" style={localStyles.recommendationText}>
                  {recommendation}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Booking Modal */}
      <Portal>
        <Modal
          visible={bookingModal}
          onDismiss={() => setBookingModal(false)}
          contentContainerStyle={localStyles.modal}
        >
          <Text variant="titleLarge" style={{ marginBottom: theme.spacing.lg }}>
            Book {droneServices[selectedService].name}
          </Text>

          <Text variant="bodyMedium" style={{ marginBottom: theme.spacing.sm }}>
            Select Plot:
          </Text>
          <View style={localStyles.plotsContainer}>
            {plots.map((plot) => (
              <Chip
                key={plot}
                mode={selectedPlot === plot ? 'flat' : 'outlined'}
                selected={selectedPlot === plot}
                onPress={() => setSelectedPlot(plot)}
                style={localStyles.plotChip}
              >
                {plot}
              </Chip>
            ))}
          </View>

          <Surface style={localStyles.costPreview}>
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
              Cost: ₹{droneServices[selectedService].pricePerAcre} per acre
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              Duration: {droneServices[selectedService].duration}
            </Text>
          </Surface>

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
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  serviceTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderWidth: 2,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
  },
  activeServiceTab: {
    backgroundColor: theme.colors.surface,
  },
  serviceText: {
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  healthOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  healthScore: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  healthBreakdown: {
    flex: 1,
  },
  healthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  issuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  diseaseChip: {
    height: 28,
  },
  ndviPreview: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
  },
  serviceDetails: {
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  detailText: {
    marginLeft: theme.spacing.sm,
  },
  chemicalsSection: {
    marginTop: theme.spacing.md,
  },
  chemicalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chemicalChip: {
    marginBottom: theme.spacing.xs,
  },
  featuresSection: {
    marginTop: theme.spacing.md,
  },
  featuresContainer: {
    gap: theme.spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: theme.spacing.sm,
  },
  droneCard: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.sm,
  },
  droneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  droneInfo: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  droneStatus: {
    alignItems: 'flex-end',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  recommendationText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  plotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  plotChip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
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

export default DroneScreen;