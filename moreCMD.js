// // Import the additional cases from file 2
// const additionalCommmand = require('./file2.js');

// // Your original switch statement
// switch (isCommand) {
//     case 'case1':
//         // Case 1 logic
//         break;
//     case 'case2':
//         // Case 2 logic
//         break;
//     // Include additional cases from file 2
//     default:
//         additionalCommmand(isCommand);
//         break;
// }


// Define a function to handle additional cases
function additionalCommmand(isCommand) {
    switch (isCommand) {
        case 'rule1':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*RULE 1: No ASEAN normie meme/sticker allowed*\n\nAccording to Judgemento, "Normie Things" refers to stickers or memes that are unrelated to anime or not widely known. To help you understand, lets compare the "RickRoll" meme, which is globally recognized, with most Malaysian/Indonesian influencer/politician memes that are mainly known locally. The goal is to avoid cringeworthy content that lacks wider appeal. If you have an issue with our rules or administration style, the "Leave Group" button is available.\n\nIts important to recognize that every community has its own unique rules and administration style. Please refrain from comparing our community to others. We believe its unfair to compare our structured community with more "anarchy"-style communities. While we may share the same genre, each community has its own distinct characteristics.';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule2':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 2: No Spamming*\n\nWe would like to remind all members that spamming and chain messages are not allowed in our community. Spamming refers to the act of flooding the group chat with multiple messages or sending repetitive content that disrupts the conversation flow. Meanwhile, chain messages refer to any message that encourages members to forward or share the same message to multiple people.\n\nWe consider such actions as disruptive and disrespectful towards other members, and it may lead to unnecessary clutter in the group chat. We encourage all members to respect one anothers space and refrain from sending multiple messages or forwarding chain messages that may annoy other members.\n\nAny member who is found spamming the chat or forwarding chain messages will be warned and reminded to refrain from such actions. If the member continues to do so, they will be removed from the group without any prior warning.\n\nWe want to maintain a healthy and active community where members can interact and engage in meaningful discussions without any disruptions. Therefore, we kindly ask all members to adhere to this rule and respect one anothers space.\n\nThank you for your cooperation.\n\nAny confusion or questions, please do not hesitate to contact any of the admins for clarification.';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule3':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 3: Keep your behavior (use less curse word etc)*\n\nRule 3 of the Neo Anime Community states that all members must keep their behavior in check. This means refraining from using excessive curse words or engaging in any other form of behavior that could be considered offensive or disruptive. We want to maintain a positive and respectful environment within our community, and therefore, any behavior that goes against this rule may result in immediate removal from the group. We ask all members to be mindful of their language and behavior when interacting with others in the community. If you have any doubts or concerns about your behavior, please do not hesitate to ask an admin for clarification. Lets work together to create a welcoming and enjoyable space for everyone in the Neo Anime Community!';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule4':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 4: No spoiler*\n\nRule 4 of our community states that no spoilers are allowed. However, we understand that discussing anime and manga often involves spoilers, so we have a few guidelines to follow. Spoilers should be limited to minor details and should not reveal major plot points or character deaths that would ruin the experience for someone who hasnt watched or read the series yet. Additionally, we recommend using spoiler tags or warning others before discussing spoilers to allow them to opt-out of the conversation if they choose to do so. It is important to respect everyones enjoyment and experience of the series, and to avoid spoiling it for others. Anyone found to be intentionally spoiling anime or manga for others will be subject to immediate removal from the community. If you are unsure about what constitutes a spoiler, please ask an admin for clarification.';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule5':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 5: Ask for permission before promoting stuff*\n\nRule 5 states that if members want to promote something, they need to submit an application to any admin first before promoting it. The application should include the following details:\n\n1. Content name: This refers to the name of the content that the member wants to promote.\n\n2. About: This refers to a brief description of the content that the member wants to promote.\n\n3. Group/Community/owner/etc: This refers to the group, community, owner, or any relevant information about the content that the member wants to promote.\n\nBy submitting an application and obtaining permission from the admin, members can avoid promoting content that may be considered inappropriate or irrelevant to the anime community.';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule6':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 6: no NSFW*\n\nRule 6 of the "Neo Anime Community" states that no NSFW content is allowed in the group. This includes any explicit or suggestive content that is not appropriate for all ages or may offend some members of the community. NSFW content includes but is not limited to sexual content, nudity, and violent or graphic imagery. The aim of this rule is to maintain a safe and respectful environment for all members of the community, regardless of age or personal beliefs. Any member found to be posting NSFW content will be immediately removed from the group.';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule7':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 7: No racist/politic*\n\nRule 7 states that racist or political discussions are not allowed in the community. This means that members should avoid sharing or discussing any content that promotes or expresses racism or discrimination based on race, ethnicity, nationality, or any other personal characteristic. Additionally, members should not engage in any political discussions or debates as these topics can be divisive and may create conflict within the community. The goal is to maintain a friendly and respectful environment where everyone feels comfortable and valued regardless of their background or beliefs. Violating this rule may result in immediate removal from the community';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule8':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 8: No kpop/kdrama things (we dont hate but this is anime community)*\n\nRule 8 states that members are not allowed to post anything related to Kpop or Kdrama in the anime community. This does not mean that the community hates Kpop or Kdrama, but the focus of the community is on anime, so anything outside of that is not allowed.\n\nThe reason for this rule is to maintain the focus and integrity of the community. Posting content related to Kpop or Kdrama may distract members from the main purpose of the community, which is to discuss and enjoy anime-related content.\n\nIt is important to respect the communitys guidelines and focus on the content that is relevant to the communitys interests. If members wish to discuss or share content related to Kpop or Kdrama, they can do so in other communities or groups that are dedicated to those topics.';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule9':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 9:  harassing other members*\n\nRule 9 is a crucial rule that aims to ensure a safe and comfortable environment for all members, especially female members, who might be vulnerable to harassment. The rule strictly prohibits any form of harassment towards other members, and any violation of this rule may result in an immediate kick from the group.\n\nHarassment can take many forms, including but not limited to verbal harassment, sexual harassment, cyberbullying, and stalking. This rule applies to all members regardless of gender, but it is particularly important for female members who may face more aggressive behavior from some male members.\n\nThe rule aims to create a community where everyone feels respected and safe. Members should not engage in any behavior that makes others feel uncomfortable or harassed. If a member feels harassed by another member, they are encouraged to report the incident to any admin, who will take the necessary action to resolve the issue.\n\nIn summary, Rule 9 aims to promote a safe and respectful environment for all members, and any form of harassment towards other members, especially female members, will not be tolerated.';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        case 'rule10':
            var media = 'https://telegra.ph/file/aa321d2670c88d1bc835d.jpg';
            var textMessage = '*Rule Number 10: Avoid conflicts*\n\nRule 10 of the anime community states "Avoid conflicts". This means that members should refrain from engaging in any behavior that may lead to conflicts or arguments within the community. It is important to maintain a positive and respectful atmosphere for everyone to enjoy.\n\nIf a member is found to be causing conflicts or behaving in a confrontational manner towards others, they may face consequences such as warnings or even being kicked out of the community.\n\nIt is important to remember that conflicts can arise due to differences in opinions and preferences, but it is important to handle them in a mature and respectful manner. If there are any issues or conflicts, members are encouraged to reach out to the admins for help in resolving the situation.';
            XliconBotInc.sendMessage(
                from, {
                  image: media,
                  caption: textMessage,
                }, { quoted: m }
            );
            break;
        default:
            // Default case or additional logic
            break;
    }
}

// Export the function to make it accessible in file 1
module.exports = additionalCommmand;

