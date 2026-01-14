import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Block } from '@/types'

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#0a0a0f',
    color: '#f2f2f2',
  },
  header: {
    marginBottom: 30,
    borderBottom: '1px solid #333',
    paddingBottom: 20,
  },
  name: {
    fontSize: 36,
    fontWeight: 'light',
    marginBottom: 8,
    color: '#ffffff',
  },
  title: {
    fontSize: 18,
    color: '#a0a0a0',
    marginBottom: 12,
  },
  contact: {
    fontSize: 10,
    color: '#707070',
    marginBottom: 4,
  },
  bio: {
    fontSize: 11,
    color: '#c0c0c0',
    lineHeight: 1.6,
    marginTop: 12,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#808080',
    marginBottom: 12,
  },
  experienceItem: {
    marginBottom: 20,
    paddingLeft: 12,
    borderLeft: '2px solid #333',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 4,
  },
  company: {
    fontSize: 12,
    color: '#a0a0a0',
    marginBottom: 8,
  },
  dateLocation: {
    fontSize: 10,
    color: '#707070',
    marginBottom: 8,
  },
  description: {
    fontSize: 10,
    color: '#c0c0c0',
    lineHeight: 1.6,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 10,
    padding: '6px 12px',
    border: '1px solid #333',
    borderRadius: 6,
    color: '#e0e0e0',
  },
  builderScore: {
    fontSize: 48,
    fontWeight: 'light',
    color: '#0ea5e9',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'light',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    color: '#707070',
  },
})

interface MinimalistPDFProps {
  blocks: Block[]
}

export function MinimalistPDF({ blocks }: MinimalistPDFProps) {
  const headerBlock = blocks.find(b => b.type === 'header')
  const experienceBlock = blocks.find(b => b.type === 'experience')
  const skillsBlock = blocks.find(b => b.type === 'skills')
  const builderScoreBlock = blocks.find(b => b.type === 'builder-score')
  const onchainBlock = blocks.find(b => b.type === 'onchain-highlights')

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {headerBlock && (
          <View style={styles.header}>
            <Text style={styles.name}>{headerBlock.data.name || 'Your Name'}</Text>
            <Text style={styles.title}>{headerBlock.data.title || 'Your Title'}</Text>

            {headerBlock.data.email && (
              <Text style={styles.contact}>{headerBlock.data.email}</Text>
            )}
            {headerBlock.data.location && (
              <Text style={styles.contact}>{headerBlock.data.location}</Text>
            )}
            {headerBlock.data.website && (
              <Text style={styles.contact}>{headerBlock.data.website}</Text>
            )}

            {headerBlock.data.bio && (
              <Text style={styles.bio}>{headerBlock.data.bio}</Text>
            )}
          </View>
        )}

        {/* Builder Score */}
        {builderScoreBlock && builderScoreBlock.data.score > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Builder Score</Text>
            <Text style={styles.builderScore}>{builderScoreBlock.data.score}</Text>
            <Text style={{ fontSize: 10, color: '#a0a0a0' }}>Talent Protocol</Text>
          </View>
        )}

        {/* Onchain Stats */}
        {onchainBlock && onchainBlock.data.transactions > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Onchain Activity</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{onchainBlock.data.contractsDeployed}</Text>
                <Text style={styles.statLabel}>Contracts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{onchainBlock.data.nftsMinted}</Text>
                <Text style={styles.statLabel}>NFTs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{onchainBlock.data.daoMemberships?.length || 0}</Text>
                <Text style={styles.statLabel}>DAOs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{onchainBlock.data.transactions}</Text>
                <Text style={styles.statLabel}>TXs</Text>
              </View>
            </View>
          </View>
        )}

        {/* Experience */}
        {experienceBlock && experienceBlock.data.experiences?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experienceBlock.data.experiences.map((exp: any, idx: number) => (
              <View key={idx} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.dateLocation}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  {exp.location && ` • ${exp.location}`}
                </Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skillsBlock && skillsBlock.data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {skillsBlock.data.skills.map((skill: string, idx: number) => (
                <Text key={idx} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}
