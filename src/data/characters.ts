import { CharacterItem, StageEnvironment } from '../types';

export const CHARACTERS: (CharacterItem & { robloxConfig?: any })[] = [
  // 1. Starter Hero (Free)
  {
    id: 'rookie-champ',
    name: 'Bloxy Prodigy',
    title: 'Starter Math Ace #01',
    category: 'legend',
    tier: 'Starter',
    price: 0,
    primaryColor: '#2563eb', // Classic Roblox Blue
    secondaryColor: '#1e293b',
    accentColor: '#f59e0b',
    skinColor: '#ffd599',
    hairColor: '#334155',
    jerseyNumber: '01',
    description: 'The iconic classic Roblox champion! Armed with sharp arithmetic calculation reflexes.',
    unlockedByDefault: true,
    stats: { speed: 70, power: 65, focus: 80 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'cap',
      skinTone: '#ffd599',
      club: 'Blox Academy'
    }
  },
  // 2. Football: Lionel Messi (Inter Miami & Argentina GOAT)
  {
    id: 'messi-10',
    name: 'Lionel Messi',
    title: 'The Magician GOAT #10',
    category: 'football',
    tier: 'Mythic',
    price: 8500,
    primaryColor: '#f472b6', // Inter Miami Pink
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    skinColor: '#ffd599',
    hairColor: '#451a03',
    jerseyNumber: '10',
    hasSoccerBall: true,
    hasAura: true,
    auraColor: '#fbbf24',
    description: '8 Ballon d’Ors! Realistic textured beard, precise swept fringe, and surgical math IQ.',
    stats: { speed: 97, power: 93, focus: 99 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'messi-fringe',
      skinTone: '#ffd599',
      hasBeard: true,
      club: 'Inter Miami / Argentina'
    }
  },
  // 3. Football: Cristiano Ronaldo (CR7 Al Nassr / Real Madrid)
  {
    id: 'ronaldo-7',
    name: 'Cristiano Ronaldo',
    title: 'CR7 The Machine #7',
    category: 'football',
    tier: 'Mythic',
    price: 8500,
    primaryColor: '#eab308', // Al Nassr Gold
    secondaryColor: '#1e3a8a',
    accentColor: '#ffffff',
    skinColor: '#e0a96d',
    hairColor: '#0f172a',
    jerseyNumber: '7',
    hasSoccerBall: true,
    hasAura: true,
    auraColor: '#eab308',
    description: 'Iconic gelled undercut fade, determined eyebrows, and unmatched mental math power!',
    stats: { speed: 99, power: 99, focus: 96 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'cr7-undercut',
      skinTone: '#e0a96d',
      club: 'Al Nassr / Portugal'
    }
  },
  // 4. Football: Kylian Mbappé (Real Madrid #9)
  {
    id: 'mbappe-9',
    name: 'Kylian Mbappé',
    title: 'Supersonic Turbo #9',
    category: 'football',
    tier: 'Legendary',
    price: 6000,
    primaryColor: '#ffffff', // Real Madrid Pure White
    secondaryColor: '#1e1b4b',
    accentColor: '#f59e0b',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '9',
    hasSoccerBall: true,
    description: 'Fresh buzz fade with crisp hairline. Lightning speed that solves equations in milliseconds.',
    stats: { speed: 99, power: 92, focus: 91 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'fade',
      skinTone: '#8d5524',
      club: 'Real Madrid'
    }
  },
  // 5. Football: Jude Bellingham (Real Madrid #5)
  {
    id: 'bellingham-5',
    name: 'Jude Bellingham',
    title: 'Belligol Midfield General #5',
    category: 'football',
    tier: 'Legendary',
    price: 5800,
    primaryColor: '#18181b', // Real Madrid Away Black/Gold
    secondaryColor: '#eab308',
    accentColor: '#ffffff',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '5',
    hasSoccerBall: true,
    description: 'High-top textured fade! Dominates every arithmetic sector of the arena.',
    stats: { speed: 92, power: 95, focus: 95 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'high-top',
      skinTone: '#8d5524',
      club: 'Real Madrid'
    }
  },
  // 6. Football: Erling Haaland (Man City #9 Viking)
  {
    id: 'haaland-9',
    name: 'Erling Haaland',
    title: 'The Viking Striker #9',
    category: 'football',
    tier: 'Legendary',
    price: 5500,
    primaryColor: '#38bdf8', // Man City Sky Blue
    secondaryColor: '#ffffff',
    accentColor: '#0284c7',
    skinColor: '#ffe0bd',
    hairColor: '#fde047',
    jerseyNumber: '9',
    hasSoccerBall: true,
    description: 'Long blonde Viking warrior ponytail and devastating arithmetic finishing power.',
    stats: { speed: 95, power: 99, focus: 93 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'viking-long',
      skinTone: '#ffe0bd',
      club: 'Manchester City'
    }
  },
  // 7. Football: Mohamed Salah (Liverpool #11 Egyptian King)
  {
    id: 'salah-11',
    name: 'Mohamed Salah',
    title: 'The Egyptian King #11',
    category: 'football',
    tier: 'Legendary',
    price: 5200,
    primaryColor: '#dc2626', // Liverpool Crimson Red
    secondaryColor: '#ffffff',
    accentColor: '#16a34a',
    skinColor: '#c68642',
    hairColor: '#18181b',
    jerseyNumber: '11',
    hasSoccerBall: true,
    description: 'Clean modern shaved buzzcut fade + signature full beard! Clinical tactical speed and mental precision.',
    stats: { speed: 96, power: 89, focus: 97 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'buzz-bald', // Clean shaved buzz fade
      skinTone: '#c68642',
      hasBeard: true,
      club: 'Liverpool FC'
    }
  },
  // 8. Football: Lamine Yamal (Barcelona #19 Wonderkid)
  {
    id: 'yamal-19',
    name: 'Lamine Yamal',
    title: 'The Golden Prodigy #19',
    category: 'football',
    tier: 'Legendary',
    price: 4900,
    primaryColor: '#1e3a8a', // Blaugrana Blue/Red
    secondaryColor: '#b91c1c',
    accentColor: '#facc15',
    skinColor: '#8d5524',
    hairColor: '#18181b',
    jerseyNumber: '19',
    hasSoccerBall: true,
    description: 'Youngest Euro champion! Signature highlighted curly taper and fearless math flair.',
    stats: { speed: 98, power: 86, focus: 94 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'yamal-curls',
      skinTone: '#8d5524',
      club: 'FC Barcelona / Spain'
    }
  },
  // 9. Football: Vinicius Jr (Real Madrid #7)
  {
    id: 'vinicius-7',
    name: 'Vinicius Jr',
    title: 'Vini Golden Spark #7',
    category: 'football',
    tier: 'Epic',
    price: 4200,
    primaryColor: '#2563eb', // Real Madrid European Blue
    secondaryColor: '#fbbf24',
    accentColor: '#ffffff',
    skinColor: '#5c3826',
    hairColor: '#09090b',
    jerseyNumber: '7',
    hasSoccerBall: true,
    description: 'Clean mid-fade and dazzling stepovers. Solves tricky arithmetic under heavy pressure.',
    stats: { speed: 98, power: 88, focus: 90 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'fade',
      skinTone: '#5c3826',
      club: 'Real Madrid / Brazil'
    }
  },
  // 10. Football: Neymar Jr (Brazil #10)
  {
    id: 'neymar-10',
    name: 'Neymar Jr',
    title: 'Samba Trickster #10',
    category: 'football',
    tier: 'Epic',
    price: 3800,
    primaryColor: '#10b981', // Brazil Emerald Green
    secondaryColor: '#fde047',
    accentColor: '#1e3a8a',
    skinColor: '#c68642',
    hairColor: '#facc15',
    jerseyNumber: '10',
    hasSoccerBall: true,
    description: 'Highlighted blonde fauxhawk spikes. Pure joy, elastic dribbles and soroban tricks.',
    stats: { speed: 94, power: 85, focus: 90 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'neymar-spikes',
      skinTone: '#c68642',
      club: 'Brazil / Al Hilal'
    }
  },
  // 11. Football: Kevin De Bruyne (Man City #17 Maestro)
  {
    id: 'debruyne-17',
    name: 'Kevin De Bruyne',
    title: 'The Math Maestro #17',
    category: 'football',
    tier: 'Epic',
    price: 3600,
    primaryColor: '#0284c7', // Sky Blue
    secondaryColor: '#93c5fd',
    accentColor: '#ffffff',
    skinColor: '#ffe0bd',
    hairColor: '#ca8a04',
    jerseyNumber: '17',
    hasSoccerBall: true,
    description: 'Slicked back ginger-blonde hair. Pinpoint vision and mathematical trajectory master.',
    stats: { speed: 86, power: 91, focus: 99 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#ffe0bd',
      club: 'Manchester City'
    }
  },
  // 12. Football: Rodri (Man City #16 Ballon d'Or Winner)
  {
    id: 'rodri-16',
    name: 'Rodri Hernandez',
    title: 'Ballon d’Or Anchor #16',
    category: 'football',
    tier: 'Legendary',
    price: 5100,
    primaryColor: '#38bdf8', // Man City
    secondaryColor: '#1e293b',
    accentColor: '#facc15',
    skinColor: '#ffd599',
    hairColor: '#1e293b',
    jerseyNumber: '16',
    hasSoccerBall: true,
    description: 'Clean classic side-part haircut. The midfield wall with 0% error rate in arithmetic.',
    stats: { speed: 85, power: 98, focus: 99 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#ffd599',
      club: 'Manchester City / Spain'
    }
  },
  // 13. Football: Cole Palmer (Chelsea #20 Cold Palmer)
  {
    id: 'palmer-20',
    name: 'Cole Palmer',
    title: 'Cold Palmer Ice King #20',
    category: 'football',
    tier: 'Legendary',
    price: 4900,
    primaryColor: '#1d4ed8', // Chelsea Royal Blue
    secondaryColor: '#ffffff',
    accentColor: '#38bdf8', // Ice Cyan
    skinColor: '#ffe0bd',
    hairColor: '#fde047',
    jerseyNumber: '20',
    hasSoccerBall: true,
    hasAura: true,
    auraColor: '#38bdf8',
    description: 'Cold as ice! Shivering arms pose and absolute ice-veins composure under timer pressure.',
    stats: { speed: 95, power: 88, focus: 98 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'fade',
      skinTone: '#ffe0bd',
      club: 'Chelsea FC / England'
    }
  },
  // 14. Football: Bukayo Saka (Arsenal #7 Starboy)
  {
    id: 'saka-7',
    name: 'Bukayo Saka',
    title: 'Starboy Electric #7',
    category: 'football',
    tier: 'Legendary',
    price: 4800,
    primaryColor: '#ef4444', // Arsenal Red
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '7',
    hasSoccerBall: true,
    description: 'Sharp precision skin fade and devastating right-wing cutting ability. Pure arithmetic gold.',
    stats: { speed: 96, power: 90, focus: 94 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'fade',
      skinTone: '#8d5524',
      club: 'Arsenal FC / England'
    }
  },
  // 15. Football: Phil Foden (Man City #47 Sniper)
  {
    id: 'foden-47',
    name: 'Phil Foden',
    title: 'The Sniper #47',
    category: 'football',
    tier: 'Legendary',
    price: 4700,
    primaryColor: '#38bdf8', // Man City
    secondaryColor: '#1e293b',
    accentColor: '#ffffff',
    skinColor: '#ffe0bd',
    hairColor: '#ca8a04',
    jerseyNumber: '47',
    hasSoccerBall: true,
    description: 'Signature razor crop fade! Pinpoint shooting and split-second problem solving.',
    stats: { speed: 95, power: 91, focus: 96 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'fade',
      skinTone: '#ffe0bd',
      club: 'Manchester City'
    }
  },
  // 16. Football: Florian Wirtz (Bayer Leverkusen #10)
  {
    id: 'wirtz-10',
    name: 'Florian Wirtz',
    title: 'The German Magician #10',
    category: 'football',
    tier: 'Epic',
    price: 4200,
    primaryColor: '#dc2626', // Leverkusen Red
    secondaryColor: '#09090b', // Black
    accentColor: '#ffffff',
    skinColor: '#ffd599',
    hairColor: '#78350f',
    jerseyNumber: '10',
    hasSoccerBall: true,
    description: 'Invincible Bundesliga champion! Uncanny spatial vision and lightning mathematical speed.',
    stats: { speed: 93, power: 86, focus: 97 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#ffd599',
      club: 'Bayer Leverkusen'
    }
  },
  // 17. Football: Luka Modric (Real Madrid #10 Maestro)
  {
    id: 'modric-10',
    name: 'Luka Modric',
    title: 'The Golden Maestro #10',
    category: 'football',
    tier: 'Legendary',
    price: 4600,
    primaryColor: '#ffffff', // Real Madrid
    secondaryColor: '#eab308',
    accentColor: '#1e1b4b',
    skinColor: '#ffe0bd',
    hairColor: '#ca8a04',
    jerseyNumber: '10',
    hasSoccerBall: true,
    description: 'Ballon d’Or legend with signature headband! Outside-of-the-foot trivela calculation.',
    stats: { speed: 84, power: 88, focus: 100 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'ninja-headband',
      skinTone: '#ffe0bd',
      club: 'Real Madrid / Croatia'
    }
  },
  // 18. Football: Robert Lewandowski (Barcelona #9 Goal King)
  {
    id: 'lewandowski-9',
    name: 'Robert Lewandowski',
    title: 'The Polish Striker #9',
    category: 'football',
    tier: 'Epic',
    price: 4300,
    primaryColor: '#1e3a8a', // Barcelona
    secondaryColor: '#b91c1c',
    accentColor: '#facc15',
    skinColor: '#ffe0bd',
    hairColor: '#1e293b',
    jerseyNumber: '9',
    hasSoccerBall: true,
    description: 'Classic slicked fade and textbook geometric striking. Relentless precision.',
    stats: { speed: 89, power: 96, focus: 95 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#ffe0bd',
      club: 'FC Barcelona / Poland'
    }
  },
  // 19. Football: Jamal Musiala (Bayern Munich #42 Bambi)
  {
    id: 'musiala-42',
    name: 'Jamal Musiala',
    title: 'The Magic Bambi #42',
    category: 'football',
    tier: 'Legendary',
    price: 4600,
    primaryColor: '#dc2626', // Bayern Red
    secondaryColor: '#ffffff',
    accentColor: '#1e3a8a',
    skinColor: '#8d5524',
    hairColor: '#18181b',
    jerseyNumber: '42',
    hasSoccerBall: true,
    description: 'Silky smooth dribbling and impossible tight-space arithmetic reflexes. Slithers through math equations.',
    stats: { speed: 97, power: 87, focus: 96 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'yamal-curls',
      skinTone: '#8d5524',
      club: 'Bayern Munich / Germany'
    }
  },
  // 20. Football: Achraf Hakimi (PSG #2 Moroccan Rocket)
  {
    id: 'hakimi-2',
    name: 'Achraf Hakimi',
    title: 'The Moroccan Turbo #2',
    category: 'football',
    tier: 'Legendary',
    price: 4500,
    primaryColor: '#1e1b4b', // PSG Navy
    secondaryColor: '#dc2626',
    accentColor: '#ffffff',
    skinColor: '#c68642',
    hairColor: '#09090b',
    jerseyNumber: '2',
    hasSoccerBall: true,
    description: 'Supersonic Moroccan flank speed! Crosses mathematical calculations with 99 speed in record time.',
    stats: { speed: 99, power: 88, focus: 93 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'fade',
      skinTone: '#c68642',
      club: 'Paris Saint-Germain / Morocco'
    }
  },
  // 21. Football: Son Heung-min (Tottenham #7 Asian Icon)
  {
    id: 'son-7',
    name: 'Son Heung-min',
    title: 'Super Sonny Sensation #7',
    category: 'football',
    tier: 'Legendary',
    price: 4400,
    primaryColor: '#ffffff', // Tottenham White
    secondaryColor: '#1e293b', // Navy
    accentColor: '#38bdf8',
    skinColor: '#ffd599',
    hairColor: '#09090b',
    jerseyNumber: '7',
    hasSoccerBall: true,
    description: 'Signature camera celebration and two-footed arithmetic precision! Curling mental calculation goals.',
    stats: { speed: 96, power: 92, focus: 97 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#ffd599',
      club: 'Tottenham Hotspur / South Korea'
    }
  },
  // 22. Football: Rodrygo Goes (Real Madrid #11 Clutch King)
  {
    id: 'rodrygo-11',
    name: 'Rodrygo Goes',
    title: 'The Clutch King #11',
    category: 'football',
    tier: 'Epic',
    price: 4300,
    primaryColor: '#ffffff', // Real Madrid Pure White
    secondaryColor: '#1e1b4b',
    accentColor: '#eab308',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '11',
    hasSoccerBall: true,
    description: 'Champions League comeback hero! Never misses under countdown buzzer pressure.',
    stats: { speed: 96, power: 89, focus: 95 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'fade',
      skinTone: '#8d5524',
      club: 'Real Madrid / Brazil'
    }
  },
  // 23. Superhero: Spider-Man (Peter Parker)
  {
    id: 'spider-hero',
    name: 'Spider Blox',
    title: 'The Web Slinger',
    category: 'superhero',
    tier: 'Legendary',
    price: 4500,
    primaryColor: '#dc2626', // Classic Red
    secondaryColor: '#2563eb', // Royal Blue
    accentColor: '#000000',
    skinColor: '#dc2626',
    hairColor: '#dc2626',
    jerseyNumber: '🕷️',
    hasAura: true,
    auraColor: '#60a5fa',
    description: 'Full Roblox Spider suit with realistic web grid mapping and reflective angular lenses.',
    stats: { speed: 98, power: 92, focus: 95 },
    robloxConfig: {
      faceType: 'mask',
      hairType: 'cowl',
      skinTone: '#dc2626'
    }
  },
  // 14. Superhero: Batman / The Dark Knight
  {
    id: 'dark-knight',
    name: 'Shadow Bat Blox',
    title: 'Guardian of Gotham',
    category: 'superhero',
    tier: 'Legendary',
    price: 4800,
    primaryColor: '#0f172a', // Obsidian Armor
    secondaryColor: '#334155',
    accentColor: '#eab308',
    skinColor: '#ffd599',
    hairColor: '#0f172a',
    hasCape: true,
    jerseyNumber: '🦇',
    description: 'Sharp bat cowl ears with armored chest plate and utility belt. Pure deductive logic.',
    stats: { speed: 90, power: 96, focus: 99 },
    robloxConfig: {
      faceType: 'bat',
      hairType: 'cowl',
      skinTone: '#ffd599'
    }
  },
  // 15. Superhero: Iron Man (Mark 85 Nanotech)
  {
    id: 'iron-hero',
    name: 'Iron Tech Blox',
    title: 'Nanotech Mark 85',
    category: 'superhero',
    tier: 'Legendary',
    price: 6500,
    primaryColor: '#b91c1c', // Crimson Gold
    secondaryColor: '#eab308',
    accentColor: '#38bdf8',
    skinColor: '#b91c1c',
    hairColor: '#b91c1c',
    hasAura: true,
    auraColor: '#38bdf8',
    jerseyNumber: '⚡',
    description: 'Titanium gold-plated helmet with illuminated Arc Reactor chest. Onboard computation!',
    stats: { speed: 96, power: 98, focus: 98 },
    robloxConfig: {
      faceType: 'cyborg',
      hairType: 'helmet',
      skinTone: '#b91c1c'
    }
  },
  // 16. Superhero: Wolverine (Weapon X)
  {
    id: 'wolverine-x',
    name: 'Wolverine Blox',
    title: 'Weapon X Berserker',
    category: 'superhero',
    tier: 'Epic',
    price: 3900,
    primaryColor: '#eab308', // Classic Yellow & Blue
    secondaryColor: '#1e3a8a',
    accentColor: '#000000',
    skinColor: '#ffd599',
    hairColor: '#0f172a',
    jerseyNumber: 'X',
    description: 'Iconic dual black-winged mask fins and adamantium claws. Never gives up on hard math.',
    stats: { speed: 94, power: 97, focus: 91 },
    robloxConfig: {
      faceType: 'bat',
      hairType: 'cowl',
      skinTone: '#ffd599'
    }
  },
  // 17. Anime: Super Saiyan Goku (God of Ki)
  {
    id: 'saiyan-goku',
    name: 'Saiyan Blox',
    title: 'Super Saiyan God',
    category: 'anime',
    tier: 'Mythic',
    price: 9000,
    primaryColor: '#ea580c', // Orange Turtle Gi
    secondaryColor: '#1d4ed8',
    accentColor: '#fde047',
    skinColor: '#ffd599',
    hairColor: '#facc15',
    hasAura: true,
    auraColor: '#fde047',
    jerseyNumber: '悟',
    description: 'Massive iconic golden Super Saiyan spiked hair! Power multiplies with every level.',
    stats: { speed: 99, power: 100, focus: 96 },
    robloxConfig: {
      faceType: 'saiyan',
      hairType: 'saiyan-huge',
      skinTone: '#ffd599'
    }
  },
  // 18. Anime: Luffy Gear 5 (Sun God Nika)
  {
    id: 'luffy-nika',
    name: 'Luffy Nika Blox',
    title: 'Joyboy Sun God',
    category: 'anime',
    tier: 'Mythic',
    price: 8800,
    primaryColor: '#ffffff', // Gear 5 Pure White
    secondaryColor: '#e11d48',
    accentColor: '#fde047',
    skinColor: '#ffd599',
    hairColor: '#ffffff',
    jerseyNumber: '👒',
    hasAura: true,
    auraColor: '#ffffff',
    description: 'Iconic Roblox straw hat, white cloud hair, and boundless joyful laughter!',
    stats: { speed: 98, power: 99, focus: 94 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'straw-hat',
      skinTone: '#ffd599'
    }
  },
  // 19. Anime: Naruto Uzumaki (Hokage)
  {
    id: 'ninja-naruto',
    name: 'Shinobi Blox',
    title: 'Hokage of Math',
    category: 'anime',
    tier: 'Legendary',
    price: 5200,
    primaryColor: '#f97316', // Orange Tracksuit
    secondaryColor: '#2563eb',
    accentColor: '#fef08a',
    skinColor: '#fed7aa',
    hairColor: '#facc15',
    hasAura: true,
    auraColor: '#38bdf8',
    jerseyNumber: '忍',
    description: 'Leaf Village metallic headband and whisker face decals. Shadow clone math power!',
    stats: { speed: 95, power: 96, focus: 94 },
    robloxConfig: {
      faceType: 'ninja',
      hairType: 'ninja-headband',
      skinTone: '#fed7aa'
    }
  },
  // 20. Gaming: Sonic Blue Speed
  {
    id: 'sonic-speed',
    name: 'Sonic Speed Blox',
    title: 'Mach 5 Blue Blur',
    category: 'anime',
    tier: 'Epic',
    price: 3400,
    primaryColor: '#1d4ed8', // Royal Blue
    secondaryColor: '#ffffff',
    accentColor: '#dc2626',
    skinColor: '#fed7aa',
    hairColor: '#1d4ed8',
    jerseyNumber: '💨',
    description: 'Blue backward quills and red sneakers. Sprints through division in supersonic speed.',
    stats: { speed: 100, power: 86, focus: 88 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'spiky',
      skinTone: '#fed7aa'
    }
  },
  // 21. Gaming: Lightning Pikachu
  {
    id: 'lightning-pika',
    name: 'Volt Blox',
    title: 'Electric Spark Rod',
    category: 'anime',
    tier: 'Rare',
    price: 2200,
    primaryColor: '#eab308', // Yellow
    secondaryColor: '#ef4444',
    accentColor: '#78350f',
    skinColor: '#facc15',
    hairColor: '#facc15',
    hasAura: true,
    auraColor: '#fef08a',
    jerseyNumber: '⚡',
    description: 'Electric red cheeks and lightning tail markings. Shocks complex problems!',
    stats: { speed: 93, power: 90, focus: 89 },
    robloxConfig: {
      faceType: 'electric',
      hairType: 'spiky',
      skinTone: '#facc15'
    }
  },
  // 22. Sci-Fi: Cyber Titan
  {
    id: 'cyber-titan',
    name: 'Cyber Mech Blox',
    title: 'Quantum Battlebot',
    category: 'superhero',
    tier: 'Rare',
    price: 1800,
    primaryColor: '#06b6d4', // Cyan Neon
    secondaryColor: '#0f172a',
    accentColor: '#ec4899',
    skinColor: '#0891b2',
    hairColor: '#06b6d4',
    jerseyNumber: '01',
    description: 'Futuristic Roblox cyborg with neon visor and quantum calculation matrix.',
    stats: { speed: 84, power: 97, focus: 96 },
    robloxConfig: {
      faceType: 'cyborg',
      hairType: 'helmet',
      skinTone: '#0891b2'
    }
  },
  // 23. Space: Astro Ranger
  {
    id: 'astro-ranger',
    name: 'Cosmic Blox Ranger',
    title: 'Galaxy Explorer',
    category: 'legend',
    tier: 'Rare',
    price: 1200,
    primaryColor: '#f8fafc', // Spacesuit White
    secondaryColor: '#f97316',
    accentColor: '#38bdf8',
    skinColor: '#38bdf8',
    hairColor: '#ffffff',
    jerseyNumber: '🚀',
    description: 'Gold-tinted helmet visor and lunar suit for solving problems in deep space.',
    stats: { speed: 82, power: 84, focus: 93 },
    robloxConfig: {
      faceType: 'cyborg',
      hairType: 'helmet',
      skinTone: '#38bdf8'
    }
  },
  // 24. Ancient Legend: Pharaoh King
  {
    id: 'pharaoh-king',
    name: 'Pharaoh Blox',
    title: 'Golden Pyramid King',
    category: 'legend',
    tier: 'Epic',
    price: 2800,
    primaryColor: '#ca8a04', // Ancient Gold
    secondaryColor: '#0284c7', // Royal Lapis
    accentColor: '#ffffff',
    skinColor: '#c68642',
    hairColor: '#09090b',
    hasCape: true,
    jerseyNumber: '👑',
    description: 'Ancient Egyptian pharaoh crown and golden sceptre. Pure geometric genius.',
    stats: { speed: 86, power: 93, focus: 99 },
    robloxConfig: {
      faceType: 'pharaoh',
      hairType: 'crown',
      skinTone: '#c68642',
      hasBeard: true
    }
  }
];

export const STAGES: StageEnvironment[] = [
  {
    id: 'stadium',
    name: 'Roblox Champions Arena',
    description: 'Iconic lush green Roblox pitch with chalk lines, floodlights & goalposts.',
    groundColor: '#16a34a',
    ambientColor: '#dcfce7',
    lightColor: '#ffffff',
    fogColor: '#f0fdf4',
    price: 0
  }
];
