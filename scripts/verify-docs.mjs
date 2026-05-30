import fs from 'node:fs/promises'
import path from 'node:path'

const docs = [
  { path: 'docs/standards/directory-expectations.md', title: 'Directory Expectations' },
  { path: 'docs/standards/coding-patterns.md', title: 'Coding Patterns and Quality Controls' },
  { path: 'docs/standards/verification-workflow.md', title: 'Verification Workflow for Agents' },
  { path: 'docs/standards/standards-update.md', title: 'Standards Update Workflow' },
]

const root = process.cwd()
const agentPath = path.resolve(root, 'AGENTS.md')
const readmePath = path.resolve(root, 'README.md')

const missingFiles = []
for (const doc of docs) {
  try {
    await fs.access(path.resolve(root, doc.path))
  } catch (err) {
    missingFiles.push(doc.path)
  }
}
if (missingFiles.length) {
  throw new Error(`Missing standard files: ${missingFiles.join(', ')}`)
}

const agents = await fs.readFile(agentPath, 'utf8')
const missingLinks = docs.filter((doc) => !agents.includes(`(${doc.path})`))
if (missingLinks.length) {
  throw new Error(
    `AGENTS.md is missing links to: ${missingLinks.map((doc) => doc.title).join(', ')}`,
  )
}

const readme = await fs.readFile(readmePath, 'utf8')
if (!readme.includes('docs/standards/')) {
  throw new Error('README.md must mention docs/standards/')
}

const requiredPhrases = ['scripts/verify-docs.mjs', 'update the relevant markdown']
const missingPhrases = requiredPhrases.filter((phrase) => !agents.includes(phrase))
if (missingPhrases.length) {
  throw new Error(`AGENTS.md must mention: ${missingPhrases.join(', ')}`)
}

console.log('✅ Doc verification passed: standards and references are aligned.')
