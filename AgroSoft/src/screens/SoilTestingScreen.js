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
  ProgressBar,
  Chip,
  Surface,
  TextInput,
  Modal,
  Portal,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
// import { LineChart } from 'react-native-chart-kit';
import { theme, styles } from '../theme/theme';
import { soilTestData, farmerProfile, regions, crops } from '../data/farmData';

const { width } = Dimensions.get('window');

const SoilTestingScreen = ({ navigation }) => {
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState('Plot A');
  const [testType, setTestType] = useState('basic');
  const [iotData, setIotData] = useState({
    moisture: 18,
    temperature: 28,
    ph: 7.2,
    ec: 0.35,
  });

  const testTypes = [
    { key: 'basic', name: 'Basic Test', price: 500, duration: '2-3 days' },
    { key: 'advanced', name: 'Advanced Test', price: 800, duration: '3-5 days' },
    { key: 'comprehensive', name: 'Comprehensive', price: 1200, duration: '5-7 days' },
  ];

  const plots = ['Plot A', 'Plot B', 'Plot C'];

  // Mock IoT sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIotData(prev => ({
        moisture: Math.max(10, Math.min(30, prev.moisture + (Math.random() - 0.5) * 2)),
        temperature: Math.max(20, Math.min(35, prev.temperature + (Math.random() - 0.5) * 1)),
        ph: Math.max(6.0, Math.min(8.0, prev.ph + (Math.random() - 0.5) * 0.1)),
        ec: Math.max(0.1, Math.min(0.8, prev.ec + (Math.random() - 0.5) * 0.05)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [6.8, 7.0, 7.1, 7.2, 7.0, 7.2],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const getNutrientLevel = (value, nutrient) => {
    const ranges = {
      nitrogen: { low: 200, high: 300 },
      phosphorus: { low: 15, high: 25 },
      potassium: { low: 120, high: 180 },
    };

    const range = ranges[nutrient];
    if (value < range.low) return { level: 'Low', color: theme.colors.error };
    if (value > range.high) return { level: 'High', color: theme.colors.warning };
    return { level: 'Optimal', color: theme.colors.success };
  };

  const handleBookTest = () => {
    const selectedTest = testTypes.find(t => t.key === testType);
    Alert.alert(
      'Confirm Booking',
      `Book ${selectedTest.name} for ${selectedPlot}\nCost: ₹${selectedTest.price}\nDuration: ${selectedTest.duration}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            setBookingModal(false);
            Alert.alert('Booking Confirmed!', 'Soil test has been scheduled. You will receive updates via SMS.');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Latest Test Results */}
      <Card style={[styles.card, { marginTop: theme.spacing.md }]}>
        <Card.Content>
          <View style={localStyles.header}>
            <Ionicons name="flask" size={24} color={theme.colors.secondary} />
            <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
              Latest Soil Test Results
            </Text>
          </View>
          
          <Surface style={localStyles.testInfo}>
            <Text variant="bodyMedium">Sample ID: {soilTestData.sampleId}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              Test Date: {soilTestData.testDate} • Plot A
            </Text>
          </Surface>

          {/* AI Health Score */}
          <View style={localStyles.healthScore}>
            <Text variant="headlineMedium" style={{ color: theme.colors.success }}>
              {soilTestData.aiInsights.soilHealth}%
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              Soil Health Score
            </Text>
            <ProgressBar 
              progress={soilTestData.aiInsights.soilHealth / 100} 
              color={theme.colors.success}
              style={localStyles.progressBar}
            />
          </View>

          <Text variant="titleSmall" style={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.sm }}>
            AI Insights
          </Text>
          <Chip 
            mode="flat" 
            style={[localStyles.fertilitChip, { backgroundColor: theme.colors.success + '20' }]}
            textStyle={{ color: theme.colors.success }}
          >
            {soilTestData.aiInsights.fertility} Fertility
          </Chip>
        </Card.Content>
      </Card>

      {/* NPK Levels */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Nutrient Analysis
          </Text>
          
          {[
            { name: 'Nitrogen', value: soilTestData.results.nitrogen, unit: 'kg/ha', key: 'nitrogen' },
            { name: 'Phosphorus', value: soilTestData.results.phosphorus, unit: 'kg/ha', key: 'phosphorus' },
            { name: 'Potassium', value: soilTestData.results.potassium, unit: 'kg/ha', key: 'potassium' },
          ].map((nutrient, index) => {
            const level = getNutrientLevel(nutrient.value, nutrient.key);
            return (
              <View key={index} style={localStyles.nutrientRow}>
                <View style={localStyles.nutrientInfo}>
                  <Text variant="bodyMedium">{nutrient.name}</Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                    {nutrient.value} {nutrient.unit}
                  </Text>
                </View>
                <Chip 
                  mode="flat" 
                  style={[localStyles.levelChip, { backgroundColor: level.color + '20' }]}
                  textStyle={{ color: level.color }}
                >
                  {level.level}
                </Chip>
              </View>
            );
          })}
        </Card.Content>
      </Card>

      {/* Live IoT Sensor Data */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={localStyles.header}>
            <Ionicons name="hardware-chip" size={24} color={theme.colors.accent} />
            <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
              Live IoT Sensors
            </Text>
            <View style={localStyles.liveIndicator}>
              <View style={localStyles.pulseDot} />
              <Text variant="bodySmall" style={{ color: theme.colors.success }}>LIVE</Text>
            </View>
          </View>

          <View style={localStyles.sensorsGrid}>
            <Surface style={localStyles.sensorCard}>
              <Ionicons name="water" size={20} color={theme.colors.secondary} />
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>Moisture</Text>
              <Text variant="titleSmall">{iotData.moisture.toFixed(1)}%</Text>
            </Surface>
            
            <Surface style={localStyles.sensorCard}>
              <Ionicons name="thermometer" size={20} color={theme.colors.error} />
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>Temperature</Text>
              <Text variant="titleSmall">{iotData.temperature.toFixed(1)}°C</Text>
            </Surface>
            
            <Surface style={localStyles.sensorCard}>
              <Ionicons name="flask" size={20} color={theme.colors.success} />
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>pH Level</Text>
              <Text variant="titleSmall">{iotData.ph.toFixed(1)}</Text>
            </Surface>
            
            <Surface style={localStyles.sensorCard}>
              <Ionicons name="flash" size={20} color={theme.colors.warning} />
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>EC</Text>
              <Text variant="titleSmall">{iotData.ec.toFixed(2)} dS/m</Text>
            </Surface>
          </View>
        </Card.Content>
      </Card>

      {/* pH Trend Chart Placeholder */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            pH Trend (6 Months)
          </Text>
          <Surface style={localStyles.chartPlaceholder}>
            <Ionicons name="analytics" size={48} color={theme.colors.primary} />
            <Text variant="bodyMedium" style={{ color: theme.colors.outline, textAlign: 'center', marginTop: 16 }}>
              Interactive pH trend chart coming soon
            </Text>
            <View style={localStyles.trendData}>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                Jan: 6.8 • Feb: 7.0 • Mar: 7.1 • Apr: 7.2 • May: 7.0 • Jun: 7.2
              </Text>
            </View>
          </Surface>
        </Card.Content>
      </Card>

      {/* AI Recommendations */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={localStyles.header}>
            <Ionicons name="bulb" size={24} color={theme.colors.warning} />
            <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
              AI Recommendations
            </Text>
          </View>

          <View style={localStyles.recommendationSection}>
            <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
              Fertilizer Recommendation
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 4 }}>
              {soilTestData.recommendations.fertilizer}
            </Text>
          </View>

          <View style={localStyles.recommendationSection}>
            <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
              Recommended Crops
            </Text>
            <View style={localStyles.cropsContainer}>
              {soilTestData.recommendations.crops.map((cropKey, index) => (
                <Chip key={index} mode="outlined" style={localStyles.cropChip}>
                  {crops[cropKey]?.name || cropKey}
                </Chip>
              ))}
            </View>
          </View>

          <View style={localStyles.recommendationSection}>
            <Text variant="titleSmall" style={{ color: theme.colors.primary }}>
              Soil Amendments
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 4 }}>
              {soilTestData.recommendations.amendments}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Book New Test */}
      <Card style={[styles.card, { marginBottom: theme.spacing.xl }]}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Book New Soil Test
          </Text>
          
          <View style={localStyles.testTypesContainer}>
            {testTypes.map((test) => (
              <Surface key={test.key} style={localStyles.testTypeCard}>
                <Text variant="titleSmall">{test.name}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  ₹{test.price} • {test.duration}
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    setTestType(test.key);
                    setBookingModal(true);
                  }}
                  style={{ marginTop: theme.spacing.sm }}
                >
                  Book Now
                </Button>
              </Surface>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Booking Modal */}
      <Portal>
        <Modal
          visible={bookingModal}
          onDismiss={() => setBookingModal(false)}
          contentContainerStyle={localStyles.modal}
        >
          <Text variant="titleLarge" style={{ marginBottom: theme.spacing.lg }}>
            Book Soil Test
          </Text>

          <Text variant="bodyMedium" style={{ marginBottom: theme.spacing.md }}>
            Test Type: {testTypes.find(t => t.key === testType)?.name}
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
              Total Cost: ₹{testTypes.find(t => t.key === testType)?.price}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              Duration: {testTypes.find(t => t.key === testType)?.duration}
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
              onPress={handleBookTest}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  testInfo: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  healthScore: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginTop: theme.spacing.sm,
  },
  fertilitChip: {
    alignSelf: 'flex-start',
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline + '20',
  },
  nutrientInfo: {
    flex: 1,
  },
  levelChip: {
    height: 28,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 4,
  },
  sensorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sensorCard: {
    width: (width - theme.spacing.md * 5) / 2,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    minHeight: 200,
  },
  trendData: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
  },
  recommendationSection: {
    marginBottom: theme.spacing.md,
  },
  cropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  cropChip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  testTypesContainer: {
    gap: theme.spacing.md,
  },
  testTypeCard: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
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

export default SoilTestingScreen;