import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  Chip,
  Surface,
  FAB,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
// import MapView, { Marker, Polygon } from 'react-native-maps';
import { theme, styles } from '../theme/theme';
import { farmerProfile } from '../data/farmData';

const { width, height } = Dimensions.get('window');

const FarmMapScreen = ({ navigation }) => {
  const [mapType, setMapType] = useState('satellite');
  const [selectedPlot, setSelectedPlot] = useState(null);

  // Mock farm plots data
  const farmPlots = [
    {
      id: 'plot_a',
      name: 'Plot A',
      landCode: 'TG-WGL-DHS-001A',
      area: 2.5,
      crop: 'Paddy',
      coordinates: [
        { latitude: 17.9689, longitude: 79.5941 },
        { latitude: 17.9695, longitude: 79.5941 },
        { latitude: 17.9695, longitude: 79.5950 },
        { latitude: 17.9689, longitude: 79.5950 },
      ],
      center: { latitude: 17.9692, longitude: 79.5945 },
      health: 85,
      lastActivity: 'Soil testing - 3 days ago',
    },
    {
      id: 'plot_b',
      name: 'Plot B',
      landCode: 'TG-WGL-DHS-001B',
      area: 1.8,
      crop: 'Cotton',
      coordinates: [
        { latitude: 17.9682, longitude: 79.5941 },
        { latitude: 17.9688, longitude: 79.5941 },
        { latitude: 17.9688, longitude: 79.5948 },
        { latitude: 17.9682, longitude: 79.5948 },
      ],
      center: { latitude: 17.9685, longitude: 79.5944 },
      health: 78,
      lastActivity: 'Drone spraying - 1 day ago',
    },
    {
      id: 'plot_c',
      name: 'Plot C',
      landCode: 'TG-WGL-DHS-001C',
      area: 1.2,
      crop: 'Maize',
      coordinates: [
        { latitude: 17.9696, longitude: 79.5941 },
        { latitude: 17.9702, longitude: 79.5941 },
        { latitude: 17.9702, longitude: 79.5947 },
        { latitude: 17.9696, longitude: 79.5947 },
      ],
      center: { latitude: 17.9699, longitude: 79.5944 },
      health: 92,
      lastActivity: 'Harvesting - 5 days ago',
    },
  ];

  const mapTypes = [
    { key: 'standard', name: 'Standard', icon: 'map' },
    { key: 'satellite', name: 'Satellite', icon: 'earth' },
    { key: 'hybrid', name: 'Hybrid', icon: 'layers' },
  ];

  const getHealthColor = (health) => {
    if (health >= 80) return theme.colors.success;
    if (health >= 60) return theme.colors.warning;
    return theme.colors.error;
  };

  const handlePlotPress = (plot) => {
    setSelectedPlot(plot);
  };

  const handleServiceBooking = (service) => {
    if (!selectedPlot) {
      Alert.alert('Select Plot', 'Please select a plot first');
      return;
    }

    Alert.alert(
      `Book ${service}`,
      `Book ${service} for ${selectedPlot.name}?\nArea: ${selectedPlot.area} acres\nCrop: ${selectedPlot.crop}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book', 
          onPress: () => {
            Alert.alert('Booking Confirmed!', `${service} has been scheduled for ${selectedPlot.name}`);
            // Navigate to respective service screen
            if (service === 'Soil Testing') navigation.navigate('SoilTesting');
            else if (service === 'Drone Service') navigation.navigate('Drone');
            else if (service === 'Machinery') navigation.navigate('Machinery');
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Map Placeholder */}
      <View style={localStyles.map}>
        <Surface style={localStyles.mapPlaceholder}>
          <Ionicons name="map" size={48} color={theme.colors.primary} />
          <Text variant="titleMedium" style={{ color: theme.colors.primary, marginTop: 16 }}>
            Farm Map View
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.outline, textAlign: 'center', marginTop: 8 }}>
            Interactive map with satellite view coming soon
          </Text>
          
          {/* Plot Selection */}
          <View style={localStyles.plotsGrid}>
            {farmPlots.map((plot) => (
              <TouchableOpacity
                key={plot.id}
                style={[
                  localStyles.plotButton,
                  { backgroundColor: getHealthColor(plot.health) + '20', borderColor: getHealthColor(plot.health) }
                ]}
                onPress={() => handlePlotPress(plot)}
              >
                <Text variant="bodySmall" style={{ color: getHealthColor(plot.health), fontWeight: 'bold' }}>
                  {plot.name}
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  {plot.area} acres
                </Text>
                <Text variant="bodySmall" style={{ color: getHealthColor(plot.health) }}>
                  {plot.health}% Health
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Surface>
      </View>

      {/* Map Type Selector */}
      <Surface style={localStyles.mapTypeSelector}>
        {mapTypes.map((type) => (
          <Button
            key={type.key}
            mode={mapType === type.key ? 'contained' : 'outlined'}
            onPress={() => setMapType(type.key)}
            style={localStyles.mapTypeButton}
            compact
          >
            {type.name}
          </Button>
        ))}
      </Surface>

      {/* Plot Information Panel */}
      {selectedPlot && (
        <Card style={localStyles.plotInfoPanel}>
          <Card.Content>
            <View style={localStyles.plotHeader}>
              <View style={localStyles.plotInfo}>
                <Text variant="titleMedium">{selectedPlot.name}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                  Land Code: {selectedPlot.landCode}
                </Text>
              </View>
              <Chip 
                mode="flat" 
                style={[localStyles.healthChip, { backgroundColor: getHealthColor(selectedPlot.health) + '20' }]}
                textStyle={{ color: getHealthColor(selectedPlot.health) }}
              >
                {selectedPlot.health}% Health
              </Chip>
            </View>

            <View style={localStyles.plotDetails}>
              <View style={localStyles.plotDetailItem}>
                <Ionicons name="resize" size={16} color={theme.colors.secondary} />
                <Text variant="bodySmall" style={localStyles.plotDetailText}>
                  {selectedPlot.area} acres
                </Text>
              </View>
              <View style={localStyles.plotDetailItem}>
                <Ionicons name="leaf" size={16} color={theme.colors.success} />
                <Text variant="bodySmall" style={localStyles.plotDetailText}>
                  {selectedPlot.crop}
                </Text>
              </View>
              <View style={localStyles.plotDetailItem}>
                <Ionicons name="time" size={16} color={theme.colors.outline} />
                <Text variant="bodySmall" style={localStyles.plotDetailText}>
                  {selectedPlot.lastActivity}
                </Text>
              </View>
            </View>

            <View style={localStyles.quickActions}>
              <Button
                mode="outlined"
                onPress={() => handleServiceBooking('Soil Testing')}
                style={localStyles.actionButton}
                compact
              >
                Soil Test
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleServiceBooking('Drone Service')}
                style={localStyles.actionButton}
                compact
              >
                Drone Scan
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleServiceBooking('Machinery')}
                style={localStyles.actionButton}
                compact
              >
                Machinery
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Farm Overview FAB */}
      <FAB
        icon="information"
        style={localStyles.infoFab}
        onPress={() => {
          Alert.alert(
            'Farm Overview',
            `Total Area: ${farmerProfile.farmSize} acres\n` +
            `Plots: ${farmPlots.length}\n` +
            `Primary Crops: ${farmerProfile.primaryCrops.join(', ')}\n` +
            `Soil Type: ${farmerProfile.soilType}\n` +
            `Location: ${farmerProfile.village}, ${farmerProfile.district}`
          );
        }}
      />

      {/* Legend */}
      <Surface style={localStyles.legend}>
        <Text variant="bodySmall" style={localStyles.legendTitle}>Health Status</Text>
        <View style={localStyles.legendItems}>
          <View style={localStyles.legendItem}>
            <View style={[localStyles.legendColor, { backgroundColor: theme.colors.success }]} />
            <Text variant="bodySmall">Excellent (80%+)</Text>
          </View>
          <View style={localStyles.legendItem}>
            <View style={[localStyles.legendColor, { backgroundColor: theme.colors.warning }]} />
            <Text variant="bodySmall">Good (60-79%)</Text>
          </View>
          <View style={localStyles.legendItem}>
            <View style={[localStyles.legendColor, { backgroundColor: theme.colors.error }]} />
            <Text variant="bodySmall">Needs Attention (<60%)</Text>
          </View>
        </View>
      </Surface>
    </View>
  );
};

const localStyles = StyleSheet.create({
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  plotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  plotButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    alignItems: 'center',
    minWidth: 80,
  },
  mapTypeSelector: {
    position: 'absolute',
    top: 50,
    right: 16,
    flexDirection: 'row',
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  mapTypeButton: {
    marginHorizontal: 2,
  },
  plotMarker: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  plotMarkerText: {
    color: theme.colors.surface,
    fontSize: 12,
    fontWeight: 'bold',
  },
  plotInfoPanel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    maxHeight: height * 0.3,
  },
  plotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  plotInfo: {
    flex: 1,
  },
  healthChip: {
    height: 28,
  },
  plotDetails: {
    marginBottom: theme.spacing.md,
  },
  plotDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  plotDetailText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.outline,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 2,
  },
  infoFab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 100,
    backgroundColor: theme.colors.secondary,
  },
  legend: {
    position: 'absolute',
    top: 50,
    left: 16,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    minWidth: 150,
  },
  legendTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  legendItems: {
    gap: theme.spacing.xs,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.xs,
  },
});

export default FarmMapScreen;