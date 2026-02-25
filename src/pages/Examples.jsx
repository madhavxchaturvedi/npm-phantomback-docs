import CodeBlock from '../components/CodeBlock';
import './DocPage.css';

export default function Examples() {
  return (
    <article className="doc-page">
      <div className="doc-badge">Examples</div>
      <h1>Real-World Examples</h1>
      <p className="doc-lead">
        Ready-to-use configurations for common application domains.
        Copy any of these as your <code>phantom.config.js</code>.
      </p>

      <h2 id="blog">Blog Platform</h2>
      <p>A blog with users, posts, comments, and categories.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    users: {
      count: 20,
      auth: true,
      schema: {
        name: 'fullName',
        email: 'email',
        avatar: 'avatar',
        bio: 'paragraph',
        role: { type: 'enum', values: ['admin', 'author', 'reader'] },
      },
    },
    categories: {
      count: 8,
      schema: {
        name: { type: 'enum', values: ['Tech', 'Design', 'Business', 'Science', 'Health', 'Travel', 'Food', 'Sports'] },
        slug: 'slug',
        description: 'sentence',
      },
    },
    posts: {
      count: 60,
      schema: {
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
      count: 150,
      schema: {
        body: 'paragraph',
        userId: { type: 'relation', resource: 'users' },
        postId: { type: 'relation', resource: 'posts' },
      },
    },
  },
};`} />

      <h2 id="ecommerce">E-Commerce Store</h2>
      <p>Products, categories, orders, and reviews for a typical online store.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    users: {
      count: 30,
      auth: true,
      schema: {
        name: 'fullName',
        email: 'email',
        avatar: 'avatar',
        address: 'address',
        phone: 'phone',
      },
    },
    categories: {
      count: 10,
      schema: {
        name: 'productName',
        image: 'image',
        description: 'sentence',
      },
    },
    products: {
      count: 80,
      schema: {
        name: 'productName',
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
      count: 100,
      schema: {
        total: 'price',
        status: { type: 'enum', values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
        address: 'address',
        userId: { type: 'relation', resource: 'users' },
      },
    },
    reviews: {
      count: 200,
      schema: {
        rating: 'rating',
        comment: 'paragraph',
        userId: { type: 'relation', resource: 'users' },
        productId: { type: 'relation', resource: 'products' },
      },
    },
  },
};`} />

      <h2 id="hospital">Hospital Management</h2>
      <p>Doctors, patients, appointments, and departments.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    departments: {
      count: 8,
      schema: {
        name: { type: 'enum', values: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Emergency', 'Surgery', 'Radiology'] },
        floor: 'number',
        headDoctor: 'fullName',
      },
    },
    doctors: {
      count: 25,
      auth: true,
      schema: {
        name: 'fullName',
        email: 'email',
        phone: 'phone',
        specialization: { type: 'enum', values: ['Cardiologist', 'Neurologist', 'Surgeon', 'Pediatrician', 'Oncologist'] },
        departmentId: { type: 'relation', resource: 'departments' },
        experience: 'number',
        avatar: 'avatar',
      },
    },
    patients: {
      count: 60,
      schema: {
        name: 'fullName',
        email: 'email',
        phone: 'phone',
        dateOfBirth: 'pastDate',
        bloodGroup: { type: 'enum', values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
        address: 'address',
      },
    },
    appointments: {
      count: 100,
      schema: {
        date: 'futureDate',
        status: { type: 'enum', values: ['scheduled', 'completed', 'cancelled', 'no-show'] },
        notes: 'sentence',
        doctorId: { type: 'relation', resource: 'doctors' },
        patientId: { type: 'relation', resource: 'patients' },
      },
    },
  },
};`} />

      <h2 id="elearning">E-Learning Platform</h2>
      <p>Courses, instructors, students, and reviews.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    instructors: {
      count: 15,
      auth: true,
      schema: {
        name: 'fullName',
        email: 'email',
        avatar: 'avatar',
        bio: 'paragraph',
        expertise: { type: 'enum', values: ['JavaScript', 'Python', 'React', 'Node.js', 'Data Science', 'DevOps'] },
        rating: 'rating',
      },
    },
    courses: {
      count: 40,
      schema: {
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
      count: 100,
      schema: {
        name: 'fullName',
        email: 'email',
        avatar: 'avatar',
        enrolledAt: 'pastDate',
      },
    },
    reviews: {
      count: 200,
      schema: {
        rating: 'rating',
        comment: 'paragraph',
        courseId: { type: 'relation', resource: 'courses' },
        studentId: { type: 'relation', resource: 'students' },
      },
    },
  },
};`} />

      <h2 id="food-delivery">Food Delivery App</h2>
      <p>Restaurants, menu items, and orders.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    restaurants: {
      count: 20,
      schema: {
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
      count: 100,
      schema: {
        name: 'productName',
        description: 'sentence',
        price: 'price',
        image: 'image',
        category: { type: 'enum', values: ['Appetizer', 'Main Course', 'Dessert', 'Drinks', 'Sides'] },
        isVeg: 'boolean',
        restaurantId: { type: 'relation', resource: 'restaurants' },
      },
    },
    orders: {
      count: 80,
      auth: true,
      schema: {
        total: 'price',
        status: { type: 'enum', values: ['placed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'] },
        address: 'address',
        restaurantId: { type: 'relation', resource: 'restaurants' },
      },
    },
  },
};`} />

      <h2 id="social-media">Social Media App</h2>
      <p>Users, posts, likes, and messages.</p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    users: {
      count: 50,
      auth: true,
      schema: {
        username: 'username',
        name: 'fullName',
        email: 'email',
        avatar: 'avatar',
        bio: 'sentence',
        followers: 'number',
        following: 'number',
        verified: 'boolean',
      },
    },
    posts: {
      count: 200,
      schema: {
        caption: 'sentence',
        image: 'image',
        likes: 'number',
        userId: { type: 'relation', resource: 'users' },
        tags: { type: 'array', items: 'word', min: 1, max: 5 },
      },
    },
    comments: {
      count: 500,
      schema: {
        text: 'sentence',
        userId: { type: 'relation', resource: 'users' },
        postId: { type: 'relation', resource: 'posts' },
      },
    },
    messages: {
      count: 300,
      schema: {
        text: 'sentence',
        read: 'boolean',
        userId: { type: 'relation', resource: 'users' },
      },
    },
  },
};`} />

      <div className="doc-next">
        <p>Next up:</p>
        <a href="/docs/cli">CLI Reference →</a>
      </div>
    </article>
  );
}
