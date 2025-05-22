
const prisma = require("@prisma/client");  // Adjust this to your Prisma setup
const crypto = require("crypto");

// Bloom Filter class implementation (as you've already defined it)
class BloomFilter {
    constructor(size, hashCount) {
        this.bitArray = new Array(size).fill(0);
        this.size = size;
        this.hashCount = hashCount;
    }

    // Hash function
    hash(value, seed) {
        const hash = crypto.createHash("md5");
        hash.update(value + seed.toString());
        return parseInt(hash.digest("hex"), 16) % this.size;
    }

    // Add value to the Bloom Filter
    add(value) {
        for (let i = 0; i < this.hashCount; i++) {
            const index = this.hash(value, i);
            this.bitArray[index] = 1;
        }
    }

    // Check if value exists in the Bloom Filter
    alreadyExists(value) {
        for (let i = 0; i < this.hashCount; i++) {
            const index = this.hash(value, i);
            if (this.bitArray[index] === 0) {
                return false;
            }
        }
        return true;
    }
}

// Create the Bloom Filter instance
const bloomFilter = new BloomFilter(1000, 3);  // Example size and hashCount, adjust as needed

// Simulating the process of adding users to the Bloom Filter
async function addUserToBloomFilter(email) {
    // Add the email to the Bloom Filter
    bloomFilter.add(email);
}

// Simulating the process of checking if a user exists based on Bloom Filter
async function getUserByEmail(req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Step 1: Check Bloom Filter first
    if (bloomFilter.alreadyExists(email)) {
        console.log("Email might exist, checking the database...");
        try {
            // Step 2: Query the database for the actual user
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error querying the database", error: error.message });
        }
    } else {
        // If Bloom Filter says it doesn't exist, we return false immediately
        return res.status(404).json({ success: false, message: "User not found" });
    }
}

// Example function to simulate adding users to Bloom Filter (you can call this on user creation)
async function addUserToDB(email) {
    try {
        await prisma.user.create({
            data: {
                name: "John Doe",
                email: email,
            },
        });
        console.log(`User with email ${email} added to the database`);
        // Add the email to the Bloom Filter after it's added to the DB
        await addUserToBloomFilter(email);
    } catch (error) {
        console.error("Error adding user:", error);
    }
}

// Example of how to add users and use Bloom Filter
addUserToDB("john.doe@example.com");

module.exports = { getUserByEmail };


// const crypto = require("crypto");

// class BloomFilter {
//     constructor(size, hashCount) {
//         this.bitArray = new Array(size).fill(0);
//         this.size = size;
//         this.hashCount = hashCount;
//     }

//     hash(value, seed) {
//         const hash = crypto.createHash("md5");
//         hash.update(value + seed.toString());

//         return parseInt(hash.digest("hex", 16)) % this.size;
//     }

//     add(value){
//         for(let i = 0; i <this.hashCount; i ++){
//             const index = this.hash(value,i);
//             this.bitArray[index]  = 1;
//         }
//     }

//     alreadyExists(value){
//         for(let i = 0; i <this.hashCount; i ++){
//             const index = this.hash(value,i);
           
//             if(this.bitArray[index] === 0){
//                 return false;
//             }
//         }

//         return true;
//     }
// }

// module.exports = BloomFilter;

