import CodeBlock from '@/components/CodeBlock';
import NextPageLink from '@/components/docs/NextPageLink';

export default function Examples() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Examples
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Real-World Examples</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Ready-to-use configurations for common application domains.
        Copy any of these as your <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">phantom.config.js</code>.
      </p>

      <h2 id="blog" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Blog Platform
      </h2>
      <p className="text-muted-foreground mb-4">A blog with users, posts, comments, and categories.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    users: {
      seed: 20,
      auth: true,
      fields: {
        name: 'name',
        email: 'email',
        avatar: 'avatar',
        bio: 'paragraph',
        role: { type: 'enum', values: ['admin', 'author', 'reader'] },
      },
    },
    categories: {
      seed: 8,
      fields: {
        name: { type: 'enum', values: ['Tech', 'Design', 'Business', 'Science', 'Health', 'Travel', 'Food', 'Sports'] },
        slug: 'slug',
        description: 'sentence',
      },
    },
    posts: {
      seed: 60,
      fields: {
        title: 'sentence',
        slug: 'slug',
        body: 'paragraphs',
        excerpt: 'sentence',
        cover: 'image',
        published: 'boolean',
        userId: { type: 'relation', resource: 'users' },
        categoryId: { type: 'relation', resource: 'categories' },
      },
    },
    comments: {
      seed: 150,
      fields: {
        body: 'paragraph',
        userId: { type: 'relation', resource: 'users' },
        postId: { type: 'relation', resource: 'posts' },
      },
    },
  },
};`} />

      <h2 id="ecommerce" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        E-Commerce Store
      </h2>
      <p className="text-muted-foreground mb-4">Products, categories, orders, and reviews for a typical online store.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    users: {
      seed: 30,
      auth: true,
      fields: {
        name: 'name',
        email: 'email',
        avatar: 'avatar',
        address: 'address',
        phone: 'phone',
      },
    },
    categories: {
      seed: 10,
      fields: {
        name: 'product',
        image: 'image',
        description: 'sentence',
      },
    },
    products: {
      seed: 80,
      fields: {
        name: 'product',
        price: 'price',
        description: 'paragraph',
        image: 'image',
        rating: 'rating',
        stock: 'number',
        sku: 'uuid',
        categoryId: { type: 'relation', resource: 'categories' },
      },
    },
    orders: {
      seed: 100,
      fields: {
        total: 'price',
        status: { type: 'enum', values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
        address: 'address',
        userId: { type: 'relation', resource: 'users' },
      },
    },
    reviews: {
      seed: 200,
      fields: {
        rating: 'rating',
        comment: 'paragraph',
        userId: { type: 'relation', resource: 'users' },
        productId: { type: 'relation', resource: 'products' },
      },
    },
  },
};`} />

      <h2 id="hospital" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Hospital Management
      </h2>
      <p className="text-muted-foreground mb-4">Doctors, patients, appointments, and departments.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    departments: {
      seed: 8,
      fields: {
        name: { type: 'enum', values: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Emergency', 'Surgery', 'Radiology'] },
        floor: 'number',
        headDoctor: 'name',
      },
    },
    doctors: {
      seed: 25,
      auth: true,
      fields: {
        name: 'name',
        email: 'email',
        phone: 'phone',
        specialization: { type: 'enum', values: ['Cardiologist', 'Neurologist', 'Surgeon', 'Pediatrician', 'Oncologist'] },
        departmentId: { type: 'relation', resource: 'departments' },
        experience: 'number',
        avatar: 'avatar',
      },
    },
    patients: {
      seed: 60,
      fields: {
        name: 'name',
        email: 'email',
        phone: 'phone',
        dateOfBirth: 'pastDate',
        bloodGroup: { type: 'enum', values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
        address: 'address',
      },
    },
    appointments: {
      seed: 100,
      fields: {
        date: 'futureDate',
        status: { type: 'enum', values: ['scheduled', 'completed', 'cancelled', 'no-show'] },
        notes: 'sentence',
        doctorId: { type: 'relation', resource: 'doctors' },
        patientId: { type: 'relation', resource: 'patients' },
      },
    },
  },
};`} />

      <h2 id="elearning" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        E-Learning Platform
      </h2>
      <p className="text-muted-foreground mb-4">Courses, instructors, students, and reviews.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    instructors: {
      seed: 15,
      auth: true,
      fields: {
        name: 'name',
        email: 'email',
        avatar: 'avatar',
        bio: 'paragraph',
        expertise: { type: 'enum', values: ['JavaScript', 'Python', 'React', 'Node.js', 'Data Science', 'DevOps'] },
        rating: 'rating',
      },
    },
    courses: {
      seed: 40,
      fields: {
        title: 'sentence',
        description: 'paragraphs',
        thumbnail: 'image',
        price: 'price',
        duration: 'number',
        level: { type: 'enum', values: ['beginner', 'intermediate', 'advanced'] },
        category: { type: 'enum', values: ['Web Dev', 'Mobile', 'Data Science', 'AI/ML', 'DevOps', 'Design'] },
        instructorId: { type: 'relation', resource: 'instructors' },
      },
    },
    students: {
      seed: 100,
      fields: {
        name: 'name',
        email: 'email',
        avatar: 'avatar',
        enrolledAt: 'pastDate',
      },
    },
    reviews: {
      seed: 200,
      fields: {
        rating: 'rating',
        comment: 'paragraph',
        courseId: { type: 'relation', resource: 'courses' },
        studentId: { type: 'relation', resource: 'students' },
      },
    },
  },
};`} />

      <h2 id="food-delivery" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Food Delivery App
      </h2>
      <p className="text-muted-foreground mb-4">Restaurants, menu items, and orders.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    restaurants: {
      seed: 20,
      fields: {
        name: 'company',
        cuisine: { type: 'enum', values: ['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'Thai', 'American', 'Mediterranean'] },
        rating: 'rating',
        address: 'address',
        image: 'image',
        deliveryTime: 'number',
        isOpen: 'boolean',
      },
    },
    menuItems: {
      seed: 100,
      fields: {
        name: 'product',
        description: 'sentence',
        price: 'price',
        image: 'image',
        category: { type: 'enum', values: ['Appetizer', 'Main Course', 'Dessert', 'Drinks', 'Sides'] },
        isVeg: 'boolean',
        restaurantId: { type: 'relation', resource: 'restaurants' },
      },
    },
    orders: {
      seed: 80,
      auth: true,
      fields: {
        total: 'price',
        status: { type: 'enum', values: ['placed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'] },
        address: 'address',
        restaurantId: { type: 'relation', resource: 'restaurants' },
      },
    },
  },
};`} />

      <h2 id="social-media" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Social Media App
      </h2>
      <p className="text-muted-foreground mb-4">Users, posts, likes, and messages.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    users: {
      seed: 50,
      auth: true,
      fields: {
        username: 'username',
        name: 'name',
        email: 'email',
        avatar: 'avatar',
        bio: 'sentence',
        followers: 'number',
        following: 'number',
        verified: 'boolean',
      },
    },
    posts: {
      seed: 200,
      fields: {
        caption: 'sentence',
        image: 'image',
        likes: 'number',
        userId: { type: 'relation', resource: 'users' },
        tags: { type: 'array', items: 'word', count: 3 },
      },
    },
    comments: {
      seed: 500,
      fields: {
        text: 'sentence',
        userId: { type: 'relation', resource: 'users' },
        postId: { type: 'relation', resource: 'posts' },
      },
    },
    messages: {
      seed: 300,
      fields: {
        text: 'sentence',
        read: 'boolean',
        userId: { type: 'relation', resource: 'users' },
      },
    },
  },
};`} />

      <NextPageLink to="/docs/cli" label="CLI Reference" />
    </article>
  );
}
