import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, desc } = req.body;

        // Basic validation
        if (!name || !email || !phone || !desc) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data');
        const contactsDir = path.join(dataDir, 'contacts');
        
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }
        if (!fs.existsSync(contactsDir)) {
            fs.mkdirSync(contactsDir);
        }

        // Create contact entry
        const contact = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            desc,
            createdAt: new Date().toISOString()
        };

        // Save to file
        const filename = `contact-${contact.id}.json`;
        await fs.promises.writeFile(
            path.join(contactsDir, filename),
            JSON.stringify(contact, null, 2)
        );

        res.status(200).json({ 
            success: true,
            message: 'Thank you! Your message has been sent successfully.' 
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
}