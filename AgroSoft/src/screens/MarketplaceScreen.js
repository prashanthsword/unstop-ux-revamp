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
  Searchbar,
  FAB,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, styles } from '../theme/theme';
import { marketplaceData } from '../data/farmData';

const MarketplaceScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('crops');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { key: 'crops', name: 'Crops', icon: 'leaf' },
    { key: 'dairy', name: 'Dairy', icon: 'nutrition' },
  ];

  const filteredItems = marketplaceData[selectedTab].filter(item =>
    item.crop?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrder = (item) => {
    Alert.alert(
      'Place Order',
      `Order ${item.crop || item.product} from ${item.farmerName}?\nPrice: ₹${item.pricePerKg || item.pricePerLiter} per ${item.crop ? 'kg' : 'liter'}\nQuantity: ${item.quantity} ${item.crop ? 'kg' : 'liters'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Order Now', 
          onPress: () => Alert.alert('Order Placed!', 'Your order has been placed successfully. The farmer will contact you soon.')
        },
      ]
    );
  };

  const renderItem = (item) => (
    <Card key={item.id} style={localStyles.itemCard}>
      <Card.Content>
        <View style={localStyles.itemHeader}>
          <View style={localStyles.itemInfo}>
            <Text variant="titleMedium">{item.crop || item.product}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              by {item.farmerName}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              📍 {item.location}
            </Text>
          </View>
          <View style={localStyles.itemDetails}>
            <Chip 
              mode="flat" 
              style={{ backgroundColor: theme.colors.success + '20' }}
              textStyle={{ color: theme.colors.success }}
            >
              {item.quality}
            </Chip>
            <Text variant="titleSmall" style={{ color: theme.colors.primary, marginTop: 4 }}>
              ₹{item.pricePerKg || item.pricePerLiter}/{item.crop ? 'kg' : 'liter'}
            </Text>
          </View>
        </View>

        <View style={localStyles.itemStats}>
          <View style={localStyles.statItem}>
            <Ionicons name="scale" size={16} color={theme.colors.secondary} />
            <Text variant="bodySmall" style={localStyles.statText}>
              {item.quantity} {item.crop ? 'kg' : 'liters'} available
            </Text>
          </View>
          <View style={localStyles.statItem}>
            <Ionicons name="calendar" size={16} color={theme.colors.secondary} />
            <Text variant="bodySmall" style={localStyles.statText}>
              {item.crop ? 'Harvested' : 'Produced'}: {item.harvestDate || item.productionDate}
            </Text>
          </View>
        </View>

        <View style={localStyles.itemActions}>
          <Button
            mode="outlined"
            onPress={() => Alert.alert('Contact', `Calling ${item.farmerName}...`)}
            style={{ flex: 1, marginRight: 8 }}
          >
            Contact
          </Button>
          <Button
            mode="contained"
            onPress={() => handleOrder(item)}
            style={{ flex: 1 }}
          >
            Order Now
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Searchbar
        placeholder={`Search ${selectedTab}...`}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={localStyles.searchBar}
      />

      {/* Category Tabs */}
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

      {/* Items List */}
      <ScrollView style={localStyles.content} showsVerticalScrollIndicator={false}>
        <Text variant="titleMedium" style={localStyles.sectionTitle}>
          Available {selectedTab === 'crops' ? 'Crops' : 'Dairy Products'}
        </Text>

        {filteredItems.map(renderItem)}

        {filteredItems.length === 0 && (
          <Surface style={localStyles.emptyState}>
            <Ionicons name="search" size={48} color={theme.colors.outline} />
            <Text variant="titleMedium" style={{ color: theme.colors.outline, marginTop: 16 }}>
              No {selectedTab} found
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.outline, textAlign: 'center', marginTop: 8 }}>
              Try adjusting your search or check back later
            </Text>
          </Surface>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        label="List Product"
        style={localStyles.fab}
        onPress={() => Alert.alert('List Product', 'Feature to list your products coming soon!')}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  searchBar: {
    margin: theme.spacing.md,
    elevation: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
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
  sectionTitle: {
    marginVertical: theme.spacing.md,
    color: theme.colors.text,
  },
  itemCard: {
    marginBottom: theme.spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemDetails: {
    alignItems: 'flex-end',
  },
  itemStats: {
    marginBottom: theme.spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  statText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.outline,
  },
  itemActions: {
    flexDirection: 'row',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background,
    marginTop: theme.spacing.xl,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default MarketplaceScreen;