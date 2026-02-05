const fs = require('fs');
const path = require('path');

const REWARDS_DIR = path.join(__dirname, '../public/rewards');
const OUTPUT_FILE = path.join(__dirname, '../src/constants/rewardList.json');

try {
    if (!fs.existsSync(REWARDS_DIR)) {
        console.warn(`Warning: Rewards directory not found at ${REWARDS_DIR}`);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(['01']));
        process.exit(0);
    }

    const files = fs.readdirSync(REWARDS_DIR);
    const rewardIds = files
        .filter(file => /^[0-9]{2}\.png$/.test(file))
        .map(file => file.replace('.png', ''))
        .sort();

    if (rewardIds.length === 0) {
        rewardIds.push('01'); // Fallback
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(rewardIds, null, 2));
    console.log(`Successfully scanned ${rewardIds.length} rewards: ${rewardIds.join(', ')}`);
} catch (err) {
    console.error('Error scanning rewards:', err);
    process.exit(1);
}
