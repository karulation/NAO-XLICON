const fs = require('fs');

// Read data from the JSON file
const jsonData = fs.readFileSync('./database.json', 'utf8');
const data = JSON.parse(jsonData);

// Access RPGusers, RPGitems, and RPGmobs from the parsed JSON object
const RPGusers = data.users;
const RPGitems = data.available_items;
const RPGmobs = data.mobs;

// Function to save updated data to JSON file
function saveDataToJSON() {
  let newData = { users: RPGusers, items: RPGitems, mobs: RPGmobs };
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

  // Increment base attack and defense based on user's level
  let level = stats.level;
  stats.attack = 10 + (level - 1) * 2; // Adjust the increment as needed
  stats.defense = 5 + (level - 1) * 1; // Adjust the increment as needed

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


function checkLevelUp(userId) {
  let userIndex = RPGusers.findIndex(user => user.user_id === userId);

  if (userIndex === -1) {
    console.log('User not found!');
    return;
  }

  let user = RPGusers[userIndex];
  let xpThresholds = [50, 100, 150, 200]; // Adjust these thresholds as needed
  let currentLevel = user.stats.level;
  let currentXP = user.stats.xp;

  // Check if the user's XP meets or exceeds the thresholds for leveling up
  for (let i = currentLevel - 1; i < xpThresholds.length; i++) {
    if (currentXP >= xpThresholds[i]) {
      // Increment user's level
      user.stats.level++;
      currentLevel = user.stats.level;

      console.log(`${user.name} leveled up to level ${currentLevel}!`);
    } else {
      // Break the loop if the current XP doesn't meet the next threshold
      break;
    }
  }

  // Save updated data to JSON file
  saveDataToJSON();
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
  
  calculateStats(userId);

  // Save updated data to JSON file
  saveDataToJSON();
}

// Function to register a new user
function registerUser(userId, name) {
  // Check if the user is already registered
  let existingUser = RPGusers.find(user => user.user_id === userId);
  if (existingUser) {
    console.log('User already registered!');
    return;
  }

  // Create a new user object
  let newUser = {
    user_id: userId,
    name: name,
    stats: {
      hp: 100,
      xp: 0,
      attack: 10,
      defense: 5,
      level: 1,
      floor: 1
    },
    equipment: {
      helmet: 'Iron Helmet',
      chestplate: 'Iron Chestplate',
      leggings: 'Iron Leggings',
      boots: 'Iron Boots',
      weapon: 'Iron Sword'
    },
    inventory: {
      offensive_items: [],
      defensive_items: []
    }
  };

  // Add the new user to the RPGusers array
  RPGusers.push(newUser);

  // Save updated data to JSON file
  saveDataToJSON();

  console.log(`Welcome to Neo Realms, brave adventurer!

As you enter this mystical realm, you find yourself surrounded by an aura of mystery and danger. The air crackles with anticipation, and the echoes of ancient legends whisper through the wind.

Suddenly, your attention is drawn to a scene of despair. In the distance, you spot Nao Shion, a renowned sorceress, her body battered and bruised, tears streaming down her face. She collapses before you, gasping for breath.

"Hero," she pleads, her voice trembling with fear and urgency, "you must help us! The Demon Lord has kidnapped my dearest friend, Ai-chan, and taken her to the treacherous depths of the 100th floor. Only you have the strength and courage to face the perils that lie ahead, to vanquish the darkness and rescue Ai-chan from the clutches of evil."

With determination burning in your heart, you accept the challenge. Your journey begins now, adventurer. Forge your path through perilous dungeons, battle fearsome monsters, and confront the ultimate evil that lurks in the shadows.

The fate of Ai-chan and the future of Neo Realms rest in your hands. May courage guide your steps, and may victory be yours!
`);
}

// Function to simulate a hunt encounter
function hunt(userId) {
  let userIndex = RPGusers.findIndex(user => user.user_id === userId);

  if (userIndex === -1) {
    console.log('User not found!');
    return;
  }

  let user = RPGusers[userIndex];
  let floor = user.stats.floor;

  // Get mobs for the user's current floor
  let availableMobs = RPGmobs[`floor_${floor}`];

  if (!availableMobs) {
    console.log('No mobs found for this floor!');
    return;
  }

  // Randomly select a mob from the available mobs
  let randomIndex = Math.floor(Math.random() * availableMobs.length);
  let mob = availableMobs[randomIndex];

  console.log(`You encountered a ${mob.name}!`);

  // Calculate damage dealt by the mob
  let damageDealt = calculateDamage(mob.attack, user.stats.defense);
  console.log(`The ${mob.name} dealt ${damageDealt} damage to you.`);

  // Update user's HP
  user.stats.hp -= damageDealt;

  if (user.stats.hp <= 0) {
    console.log('You were defeated by the mob!');
    // Subtract 20% of user's XP upon defeat
    user.stats.xp -= Math.round(user.stats.xp * 0.2);
  } else {
    console.log('You defeated the mob!');
    // Add XP based on mob defeated
    user.stats.xp += Math.round(mob.xpReward);
  }

  // Update user data in RPGusers
  RPGusers[userIndex] = user;

  calculateStats(userId);

  // Save updated data to JSON file
  saveDataToJSON();
}

function buyItem(userId, itemName) {
  let userIndex = RPGusers.findIndex(user => user.user_id === userId);

  if (userIndex === -1) {
    console.log('User not found!');
    return;
  }

  let user = RPGusers[userIndex];
  let inventory = user.inventory;

  // Find the item in available_items
  let item = RPGitems.offensive_items.find(item => item.name === itemName) || 
             RPGitems.defensive_items.find(item => item.name === itemName);

  if (!item) {
    console.log('Item not found in the shop!');
    return;
  }

  // Check if the user has enough gold
  let itemCost = item.cost || 0; // Assuming each item has a cost property, defaulting to 0 if not specified
  if (user.gold < itemCost) {
    console.log('Insufficient gold to buy this item!');
    return;
  }

  // Deduct the gold from user's balance
  user.gold -= itemCost;

  // Add the item to the user's inventory
  let inventoryType = RPGitems.offensive_items.includes(item) ? 'offensive_items' : 'defensive_items';
  let userInventoryItem = inventory[inventoryType].find(i => i.name === itemName);

  if (userInventoryItem) {
    // If the user already has the item, increase its total count
    userInventoryItem.total++;
  } else {
    // If the user doesn't have the item, add it to the inventory
    inventory[inventoryType].push({ name: itemName, total: 1, durability: item.durability || 100 }); // Assuming default durability is 100 if not specified
  }

  // Update user data in RPGusers
  RPGusers[userIndex] = user;

  // Save updated data to JSON file
  saveDataToJSON();

  console.log(`${itemName} bought successfully.`);
}

function buyItem(userId, itemName) {
  let userIndex = RPGusers.findIndex(user => user.user_id === userId);

  if (userIndex === -1) {
    console.log('User not found!');
    return;
  }

  let user = RPGusers[userIndex];
  let inventory = user.inventory;
  let userGold = user.gold;

  // Find the item in available_items
  let item = RPGitems.offensive_items.find(item => item.name === itemName);
  if (!item) {
    item = RPGitems.defensive_items.find(item => item.name === itemName);
  }

  if (!item) {
    console.log('Item not found in the shop!');
    return;
  }

  // Check if the user has enough gold
  let itemCost = item.cost || 5; // Assuming each item has a cost property, defaulting to 0 if not specified
  if (userGold < itemCost) {
    console.log('Insufficient gold to buy this item!');
    return;
  }

  // Deduct the gold from user's balance
  userGold -= itemCost;

  // Add the item to the user's inventory
  let inventoryType = RPGitems.offensive_items.includes(item) ? 'offensive_items' : 'defensive_items';
  let userInventoryItem = inventory[inventoryType].find(i => i.name === itemName);

  if (userInventoryItem) {
    // If the user already has the item, increase its total count and update durability
    userInventoryItem.total++;
    userInventoryItem.durability = item.durability || 100; // Update durability if specified
  } else {
    // If the user doesn't have the item, add it to the inventory
    inventory[inventoryType].push({ name: itemName, total: 1, durability: item.durability || 100 }); // Assuming default durability is 100 if not specified
  }

  // Update user's gold balance
  user.gold = userGold;

  // Update user data in RPGusers
  RPGusers[userIndex] = user;

  // Save updated data to JSON file
  saveDataToJSON();

  console.log(`${itemName} bought successfully.`);
}

function showShop() {
  console.log('🛒 Neo Realm Shop:');
  
  // Display offensive items
  console.log('\nOffensive Items:');
  RPGitems.offensive_items.forEach(item => {
    console.log(`- ${item.name} | Cost: ${item.cost || 0} gold | Attack: ${item.attack} | Durability: ${item.durability || 100}`);
  });
  
  // Display defensive items
  console.log('\nDefensive Items:');
  RPGitems.defensive_items.forEach(item => {
    console.log(`- ${item.name} | Cost: ${item.cost || 0} gold | Defense: ${item.defense} | Durability: ${item.durability || 100}`);
  });
}

