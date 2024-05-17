const fs = require('fs');

// Read data from the JSON file
const jsonData = fs.readFileSync('./database.json', 'utf8');
const data = JSON.parse(jsonData);

// Access RPGusers and RPGitems from the parsed JSON object
const RPGusers = data.users;
const RPGitems = data.available_items; // Accessing available items, not RPG items

// Function to save updated data to JSON file
function saveDataToJSON() {
  let newData = { users: RPGusers, items: RPGitems };
  fs.writeFileSync('./database.json', JSON.stringify(newData, null, 2));
}

// ----------------------------------------START CALCULATION-----------------------------------------------------

function calculateStats(userId) {
  let userIndex = RPGusers.findIndex(user => user.user_id === userId);

  if (userIndex === -1) {
    console.log('User not found!');
    return;
  }

  let user = RPGusers[userIndex];
  let equipment = user.equipment;
  let inventory = user.inventory;
  let stats = user.stats;

  // Reset user's stats to base values
  stats.hp = 100;
  stats.attack = 10;
  stats.defense = 5;

  // Update user's stats based on equipped items
  updateStatsFromItem(equipment.helmet, 'defense', stats);
  updateStatsFromItem(equipment.chestplate, 'defense', stats);
  updateStatsFromItem(equipment.leggings, 'defense', stats);
  updateStatsFromItem(equipment.boots, 'defense', stats);
  updateStatsFromItem(equipment.weapon, 'attack', stats);

  // Update user's stats based on inventory items
  inventory.offensive_items.forEach(item => {
    updateStatsFromItem(item.name, 'attack', stats);
  });

  inventory.defensive_items.forEach(item => {
    updateStatsFromItem(item.name, 'defense', stats);
  });

  // Update user data in RPGusers
  RPGusers[userIndex] = user;

  // Save updated data to JSON file
  saveDataToJSON();
}


function calculateDamage(attackerAttack, defenderDefense) {
  // Calculate damage dealt
  let damage = Math.max(attackerAttack - defenderDefense, 0);
  return damage;
}

// ----------------------------------------END CALCULATION-----------------------------------------------------

// Function to update user's stats based on equipped or inventory items
function updateStatsFromItem(itemName, statType, stats) {
  let item = RPGitems.find(item => item.name === itemName);

  if (item) {
    stats[statType] += item[statType];
  }
}

// Function to show a user's profile including equipment details
function showUserProfile(userId) {
  let user = RPGusers.find(user => user.user_id === userId);

  if (!user) {
    console.log('User not found!');
    return;
  }

  let profileMessage = `
🛡️ *User Profile:*
- *Name:* ${user.name}
- *Stats:*
  - *HP:* ${user.stats.hp}
  - *XP:* ${user.stats.xp}
  - *Attack:* ${user.stats.attack}
  - *Defense:* ${user.stats.defense}
  - *Level:* ${user.stats.level}
  - *Floor:* ${user.stats.floor}
🏹 *Equipment:*
`;

  // Fetch equipment details from RPGitems
  let helmetDetail = RPGitems.defensive_items.find(item => item.name === user.equipment.helmet);
  let chestplateDetail = RPGitems.defensive_items.find(item => item.name === user.equipment.chestplate);
  let leggingsDetail = RPGitems.defensive_items.find(item => item.name === user.equipment.leggings);
  let bootsDetail = RPGitems.defensive_items.find(item => item.name === user.equipment.boots);
  let weaponDetail = RPGitems.offensive_items.find(item => item.name === user.equipment.weapon);

  // Include equipment details in the profile message
  profileMessage += `
  - *Helmet:*
    ${helmetDetail ? `- *Defense:* ${helmetDetail.defense}` : '- [Unknown]'}
  - *Chestplate:*
    ${chestplateDetail ? `- *Defense:* ${chestplateDetail.defense}` : '- [Unknown]'}
  - *Leggings:*
    ${leggingsDetail ? `- *Defense:* ${leggingsDetail.defense}` : '- [Unknown]'}
  - *Boots:*
    ${bootsDetail ? `- *Defense:* ${bootsDetail.defense}` : '- [Unknown]'}
  - *Weapon:*
    ${weaponDetail ? `- *Attack:* ${weaponDetail.attack}` : '- [Unknown]'}
  `;

  console.log(profileMessage);
  // Send the message
  XliconBotInc.sendMessage(
    m.chat,
    { text: `User Profile for ${userId}: \n${profileMessage}` },
    { quoted: m }
  );
}


// Function to check a user's inventory and add item details
function checkInventory(userId) {
  let user = RPGusers.find(user => user.user_id === userId);

  if (!user) {
    console.log('User not found!');
    return;
  }

  let inventoryMessage = `
🎒 *Inventory:*
- *Offensive Items:*
`;

  user.inventory.offensive_items.forEach(item => {
    let itemDetail = RPGitems.offensive_items.find(i => i.name === item.name);
    if (itemDetail) {
      inventoryMessage += `
  🗡️ *${item.name}:* 
    - *Total:* ${item.total}
    - *Durability:* ${item.durability}
    - *Attack:* ${itemDetail.attack}
    `;
    } else {
      inventoryMessage += `
  🗡️ *${item.name}:* 
    - *Total:* ${item.total}
    - *Durability:* ${item.durability}
    - *Attack:* [Unknown]
    `;
    }
  });

  inventoryMessage += `
- *Defensive Items:*
`;

  user.inventory.defensive_items.forEach(item => {
    let itemDetail = RPGitems.defensive_items.find(i => i.name === item.name);
    if (itemDetail) {
      inventoryMessage += `
  🛡️ *${item.name}:* 
    - *Total:* ${item.total}
    - *Durability:* ${item.durability}
    - *Defense:* ${itemDetail.defense}
    `;
    } else {
      inventoryMessage += `
  🛡️ *${item.name}:* 
    - *Total:* ${item.total}
    - *Durability:* ${item.durability}
    - *Defense:* [Unknown]
    `;
    }
  });

  console.log(inventoryMessage);
}

// Function to change user's equipment based on inventory
function changeEquipment(userId, slot, itemName) {
  let userIndex = RPGusers.findIndex(user => user.user_id === userId);

  if (userIndex === -1) {
    console.log('User not found!');
    return;
  }

  let user = RPGusers[userIndex];
  let inventory = user.inventory;

  // Check if the user has the item in inventory
  let itemIndex = -1;
  if (slot === 'weapon') {
    itemIndex = inventory.offensive_items.findIndex(item => item.name === itemName);
  } else {
    itemIndex = inventory.defensive_items.findIndex(item => item.name === itemName);
  }

  if (itemIndex === -1) {
    console.log('Item not found in inventory!');
    return;
  }

  // Update equipment with the new item
  if (slot === 'weapon') {
    user.equipment.weapon = itemName;
  } else {
    user.equipment[slot] = itemName;
  }

  console.log(`${itemName} equipped successfully in ${slot} slot.`);

  // // Remove the item from inventory
  // if (slot === 'weapon') {
  //   inventory.offensive_items[itemIndex].total--;
  //   if (inventory.offensive_items[itemIndex].total === 0) {
  //     inventory.offensive_items.splice(itemIndex, 1);
  //   }
  // } else {
  //   inventory.defensive_items[itemIndex].total--;
  //   if (inventory.defensive_items[itemIndex].total === 0) {
  //     inventory.defensive_items.splice(itemIndex, 1);
  //   }
  // }

  // Update user data in RPGusers
  RPGusers[userIndex] = user;

  // Save updated data to JSON file
  saveDataToJSON();
}

