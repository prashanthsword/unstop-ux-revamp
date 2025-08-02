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
  Avatar,
  Button,
  ProgressBar,
  Chip,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, styles } from '../theme/theme';
import { farmerProfile, crops, regions } from '../data/farmData';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [cropHealth, setCropHealth] = useState(85);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 'Light',
  });

  const quickActions = [
    {
      title: 'Book Machinery',
      icon: 'construct',
      color: theme.colors.primary,
      onPress: () => navigation.navigate('Machinery'),
    },
    {
      title: 'Soil Testing',
      icon: 'flask',
      color: theme.colors.secondary,
      onPress: () => navigation.navigate('SoilTesting'),
    },
    {
      title: 'Drone Spraying',
      icon: 'airplane',
      color: theme.colors.accent,
      onPress: () => navigation.navigate('Drone'),
    },
    {
      title: 'Marketplace',
      icon: 'storefront',
      color: theme.colors.success,
      onPress: () => navigation.navigate('Marketplace'),
    },
    {
      title: 'Hire Workers',
      icon: 'people',
      color: theme.colors.warning,
      onPress: () => navigation.navigate('Worker'),
    },
    {
      title: 'Credit & Wallet',
      icon: 'wallet',
      color: theme.colors.info,
      onPress: () => navigation.navigate('Wallet'),
    },
  ];

  const getDiseaseRiskLevel = (health) => {
    if (health >= 80) return { level: 'Low', color: theme.colors.success };
    if (health >= 60) return { level: 'Medium', color: theme.colors.warning };
    return { level: 'High', color: theme.colors.error };
  };

  const riskInfo = getDiseaseRiskLevel(cropHealth);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Farmer Profile Header */}
      <Card style={[styles.card, { marginTop: theme.spacing.md }]}>
        <Card.Content>
          <View style={localStyles.profileHeader}>
            <Avatar.Text 
              size={60} 
              label={farmerProfile.name.split(' ').map(n => n[0]).join('')}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={localStyles.profileInfo}>
              <Text variant="titleMedium" style={{ color: theme.colors.text }}>
                Welcome, {farmerProfile.name}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                {farmerProfile.village}, {farmerProfile.district}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                Land Code: {farmerProfile.landCode}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('FarmMap')}>
              <Ionicons name="map" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={localStyles.farmDetails}>
            <Chip mode="outlined" style={localStyles.chip}>
              {farmerProfile.farmSize} Acres
            </Chip>
            <Chip mode="outlined" style={localStyles.chip}>
              {farmerProfile.soilType}
            </Chip>
            <Chip mode="outlined" style={localStyles.chip}>
              {farmerProfile.region}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* AI Crop Health Check */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <View style={localStyles.healthHeader}>
            <Ionicons name="leaf" size={24} color={theme.colors.success} />
            <Text variant="titleMedium" style={{ marginLeft: theme.spacing.sm }}>
              AI Crop Health Check
            </Text>
          </View>
          
          <View style={localStyles.healthContent}>
            <View style={localStyles.healthScore}>
              <Text variant="headlineMedium" style={{ color: theme.colors.success }}>
                {cropHealth}%
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                Overall Health
              </Text>
            </View>
            
            <View style={localStyles.healthDetails}>
              <ProgressBar 
                progress={cropHealth / 100} 
                color={theme.colors.success}
                style={localStyles.progressBar}
              />
              <View style={localStyles.riskContainer}>
                <Text variant="bodyMedium">Disease Risk: </Text>
                <Chip 
                  mode="flat" 
                  style={[localStyles.riskChip, { backgroundColor: riskInfo.color + '20' }]}
                  textStyle={{ color: riskInfo.color }}
                >
                  {riskInfo.level}
                </Chip>
              </View>
            </View>
          </View>

          <Surface style={localStyles.dronePreview}>
            <View style={localStyles.droneHeader}>
              <Ionicons name="camera" size={20} color={theme.colors.secondary} />
              <Text variant="bodyMedium" style={{ marginLeft: theme.spacing.xs }}>
                Latest Drone Imaging
              </Text>
            </View>
            <Text variant="bodySmall" style={{ color: theme.colors.outline, marginTop: 4 }}>
              Last scan: 2 days ago • Next recommended: 5 days
            </Text>
            <View style={localStyles.alertsContainer}>
              <Text variant="bodySmall" style={{ color: theme.colors.warning }}>
                ⚠️ Mild pest activity detected in Plot B
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.success }}>
                ✅ Excellent growth in Plot A & C
              </Text>
            </View>
          </Surface>
        </Card.Content>
      </Card>

      {/* Quick Actions Grid */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Quick Actions
          </Text>
          <View style={localStyles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[localStyles.actionButton, { borderColor: action.color }]}
                onPress={action.onPress}
              >
                <Ionicons name={action.icon} size={28} color={action.color} />
                <Text 
                  variant="bodySmall" 
                  style={[localStyles.actionText, { color: action.color }]}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Current Crops */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Current Crops
          </Text>
          <View style={localStyles.cropsContainer}>
            {farmerProfile.primaryCrops.map((cropKey, index) => {
              const crop = crops[cropKey];
              return (
                <Surface key={index} style={localStyles.cropCard}>
                  <Text variant="titleSmall">{crop.name}</Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                    {crop.season} • {crop.duration}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
                    ₹{crop.pricePerKg}/kg
                  </Text>
                </Surface>
              );
            })}
          </View>
        </Card.Content>
      </Card>

      {/* Recent Activity */}
      <Card style={[styles.card, { marginBottom: theme.spacing.xl }]}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Recent Activity
          </Text>
          <View style={localStyles.activityItem}>
            <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
            <Text variant="bodyMedium" style={localStyles.activityText}>
              Soil test completed for Plot A
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              2 days ago
            </Text>
          </View>
          <View style={localStyles.activityItem}>
            <Ionicons name="airplane" size={20} color={theme.colors.secondary} />
            <Text variant="bodyMedium" style={localStyles.activityText}>
              Drone spraying scheduled for tomorrow
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              1 day ago
            </Text>
          </View>
          <View style={localStyles.activityItem}>
            <Ionicons name="construct" size={20} color={theme.colors.warning} />
            <Text variant="bodyMedium" style={localStyles.activityText}>
              Tractor booking completed
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              3 days ago
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  profileInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  farmDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    marginRight: theme.spacing.xs,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  healthContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  healthScore: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  healthDetails: {
    flex: 1,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskChip: {
    height: 24,
  },
  dronePreview: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
  },
  droneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertsContainer: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - theme.spacing.md * 4) / 3,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  actionText: {
    marginTop: theme.spacing.xs,
    textAlign: 'center',
    fontWeight: '500',
  },
  cropsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  cropCard: {
    flex: 1,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline + '20',
  },
  activityText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
});

export default HomeScreen;