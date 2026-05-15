import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import {
  Info,
  ExternalLink,
  UploadCloud,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Award,
  Building2,
  Radiation,
  Recycle,
  FileText,
  Leaf,
  ShieldCheck,
  ClipboardList,
  Bell,
  Search,
} from 'lucide-react-native';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

interface ComplianceDoc {
  id: string;
  name: string;
  expiryDate?: string;
  licenseId?: string;
  status: 'Uploaded' | 'Not Uploaded' | 'Expiring Soon' | 'Verified';
  daysLeft?: number;
  icon: React.ReactNode;
  color: string;
}

const COMPLIANCE_DOCS: ComplianceDoc[] = [
  {
    id: 'nabl',
    name: 'NABL Accreditation Certificate',
    expiryDate: '15 Mar 2026',
    licenseId: 'MC-2024-00312',
    status: 'Verified',
    icon: <Award size={20} color="#F59E0B" />,
    color: '#F59E0B',
  },
  {
    id: 'nabh',
    name: 'NABH Accreditation Details',
    status: 'Not Uploaded',
    icon: <Building2 size={20} color="#8B5CF6" />,
    color: '#8B5CF6',
  },
  {
    id: 'aerb',
    name: 'AERB Radiation Safety Certificate',
    expiryDate: '30 Sep 2025',
    daysLeft: 62,
    status: 'Expiring Soon',
    icon: <Radiation size={20} color="#D97706" />,
    color: '#D97706',
  },
  {
    id: 'bmw',
    name: 'Biomedical Waste Management License',
    expiryDate: '12 Jan 2026',
    licenseId: 'BMW/2022/TN/4521',
    status: 'Uploaded',
    icon: <Recycle size={20} color="#10B981" />,
    color: '#10B981',
  },
  {
    id: 'clinical',
    name: 'Clinical Establishment License',
    expiryDate: '31 Dec 2025',
    licenseId: 'CL/2021/TN/8831',
    status: 'Uploaded',
    icon: <Building2 size={20} color="#64748B" />,
    color: '#64748B',
  },
  {
    id: 'pollution',
    name: 'Pollution Control Clearance',
    status: 'Not Uploaded',
    icon: <Leaf size={20} color="#22C55E" />,
    color: '#22C55E',
  },
];

const StatusBadge = ({ status }: { status: ComplianceDoc['status'] }) => {
  let bgColor = '#F8FAFC';
  let textColor = '#64748B';
  let label = status;

  if (status === 'Uploaded' || status === 'Verified') {
    bgColor = '#F0FDF4';
    textColor = '#166534';
  } else if (status === 'Expiring Soon') {
    bgColor = '#FFF7ED';
    textColor = '#9A3412';
  }

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const SummaryCard = ({ title, count, subtitle, icon, color }: any) => (
  <View style={styles.summaryCard}>
    <View style={[styles.summaryIconContainer, { backgroundColor: `${color}15` }]}>
      {React.cloneElement(icon as React.ReactElement, { color, size: 20 })}
    </View>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={styles.summaryCount}>{count}</Text>
    <Text style={styles.summarySubtitle}>{subtitle}</Text>
  </View>
);

export default function ComplianceScreen() {
  const [docs, setDocs] = useState<ComplianceDoc[]>(COMPLIANCE_DOCS);

  const stats = {
    compliant: docs.filter((d) => d.status === 'Verified' || d.status === 'Uploaded').length,
    expiring: docs.filter((d) => d.status === 'Expiring Soon').length,
    pending: docs.filter((d) => d.status === 'Not Uploaded').length,
  };

  const handleAction = (doc: ComplianceDoc) => {
    Alert.alert(
      doc.name,
      `Choose an action for ${doc.name}`,
      [
        { text: 'View Document', onPress: () => console.log('View') },
        { text: doc.status === 'Not Uploaded' ? 'Upload' : 'Replace', onPress: () => console.log('Upload') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Accreditation & Compliance',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        }} 
      />
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Info Alert */}
        <View style={styles.infoAlert}>
          <View style={styles.infoIconCircle}>
            <Info size={14} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            Documents with expiry within 90 days will trigger automatic renewal reminders.
          </Text>
        </View>

        {/* Dashboard Stats */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleText}>COMPLIANCE OVERVIEW</Text>
        </View>
        
        <View style={styles.statsGrid}>
          <SummaryCard
            title="COMPLIANT"
            count={stats.compliant}
            subtitle="Verified docs"
            icon={<ShieldCheck />}
            color="#10B981"
          />
          <SummaryCard
            title="EXPIRING"
            count={stats.expiring}
            subtitle="Next 90 days"
            icon={<AlertTriangle />}
            color="#F59E0B"
          />
          <SummaryCard
            title="PENDING"
            count={stats.pending}
            subtitle="Action needed"
            icon={<ClipboardList />}
            color="#EF4444"
          />
          <SummaryCard
            title="ALERTS"
            count={stats.compliant + stats.expiring}
            subtitle="Auto-renewal"
            icon={<Bell />}
            color="#3B82F6"
          />
        </View>

        {/* Documents List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleText}>COMPLIANCE DOCUMENTS</Text>
        </View>

        {docs.map((doc) => (
          <TouchableOpacity 
            key={doc.id} 
            style={styles.docCard}
            onPress={() => handleAction(doc)}
            activeOpacity={0.7}
          >
            <View style={styles.docCardLeft}>
              <View style={[styles.docIconContainer, { backgroundColor: '#F8FAFC' }]}>
                {doc.icon}
              </View>
              <View style={styles.docInfo}>
                <Text style={styles.docName}>{doc.name}</Text>
                {doc.status === 'Not Uploaded' ? (
                  <Text style={styles.docSubtitle}>No document uploaded</Text>
                ) : (
                  <View style={styles.expiryRow}>
                    <Text style={styles.docSubtitle}>
                      Exp: {doc.expiryDate} {doc.licenseId ? `· ${doc.licenseId}` : ''}
                    </Text>
                    {doc.status === 'Expiring Soon' && (
                      <View style={styles.miniAlert}>
                        <AlertTriangle size={10} color="#D97706" />
                        <Text style={styles.miniAlertText}>{doc.daysLeft}d left</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.docCardRight}>
              <StatusBadge status={doc.status} />
              <View style={styles.actionIcon}>
                <UploadCloud size={16} color="#64748B" />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  infoAlert: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoIconCircle: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    color: '#1E40AF',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    lineHeight: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    width: (width - 52) / 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  summarySubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  docCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  docCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  docIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  docSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  miniAlertText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D97706',
    marginLeft: 3,
  },
  docCardRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
