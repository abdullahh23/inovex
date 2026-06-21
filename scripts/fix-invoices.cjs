const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lib', 'invoices.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the broken deleteUser function (lines 165-176) with correct version
const broken = `/** Permanently delete a user -- cannot login again, must create new account */
export async function deleteUser(userId: string): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Not authenticated');
  const apiBase = import.meta.env.VITE_API_URL || '';
  const res = await fetch(\${apiBase}/api/admin/delete-user/, {
    method: 'DELETE',
    headers: { 'Authorization': Bearer  },
  });
  const json = await res.json().catch(() => ({ success: false, error: 'Server error' }));
  if (!json.success) throw new Error(json.error || 'Failed to delete user');
}`;

const fixed = `/** Permanently delete a user -- cannot login again, must create new account */
export async function deleteUser(userId: string): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Not authenticated');
  const apiBase = import.meta.env.VITE_API_URL || '';
  const res = await fetch(\`\${apiBase}/api/admin/delete-user/\${userId}\`, {
    method: 'DELETE',
    headers: { 'Authorization': \`Bearer \${session.access_token}\` },
  });
  const json = await res.json().catch(() => ({ success: false, error: 'Server error' }));
  if (!json.success) throw new Error(json.error || 'Failed to delete user');
}`;

if (content.includes(broken.split('\n')[5].trim().slice(0, 30))) {
  // Find and replace just the broken lines
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    if (line.includes('/api/admin/delete-user/, {')) {
      return line.replace(
        /fetch\(\$\{apiBase\}\/api\/admin\/delete-user\/, \{/,
        'fetch(`${apiBase}/api/admin/delete-user/${userId}`, {'
      );
    }
    if (line.includes("'Authorization': Bearer  }")) {
      return line.replace(
        /'Authorization': Bearer  }/,
        "'Authorization': `Bearer ${session.access_token}` }"
      );
    }
    return line;
  });
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log('Fixed!');
} else {
  console.log('Pattern not found - checking...');
  console.log(content.substring(content.indexOf('deleteUser'), content.indexOf('deleteUser') + 400));
}
