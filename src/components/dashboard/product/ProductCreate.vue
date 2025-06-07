<script setup>
import { ref, reactive, computed } from 'vue';

const props = defineProps({
       currentView: {
          currentView: {
          type: String,
         default: 'add-store'
       },
    }
});

const emit = defineEmits([
  'update:current-view',
])

const setCurrentView = (view) => {
  emit('update:current-view', view)
}

const uploadProgress = ref([]);
const uploading = ref(false);
const collections = ref([
  {
    name: "Men Wear",
    id: "collection-1",
  },
]);
const fileInput = ref(null);
const enableOptions = ref(false);
const enableVariants = ref(false);
const enableCollection = ref(false);
const newProduct = ref({
  name: "",
  store_id: "",
  description: "",
  category: "",
  status: "draft",
  price: null,
  compare_price: null,
  inventory: null,
  collection_id: "collection-1",
  product_options: [],
  product_variants: [],
  images: [],
});
const products = reactive([
  {
    pk: "prod-1",
    store_pk: "store-1",
    title: "iPhone 15 Pro",
    subtitle: "Latest Apple smartphone",
    description: "The most advanced iPhone with titanium design",
    price: 999.99,
    thumbnail:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
    stock_quantity: 50,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 25,
  },
  {
    pk: "prod-2",
    store_pk: "store-2",
    title: "Designer Dress",
    subtitle: "Elegant evening wear",
    description: "Beautiful designer dress for special occasions",
    price: 299.99,
    thumbnail:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop",
    stock_quantity: 15,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 8,
  },
  {
    pk: "prod-3",
    store_pk: "store-3",
    title: "Plant Pot Set",
    subtitle: "Decorative ceramic pots",
    description: "Set of 3 beautiful ceramic plant pots",
    price: 45.99,
    thumbnail:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop",
    stock_quantity: 30,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 12,
  },
  {
    pk: "prod-4",
    store_pk: "store-1",
    title: "MacBook Pro",
    subtitle: "Professional laptop",
    description: "High-performance laptop for professionals",
    price: 1299.99,
    thumbnail:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop",
    stock_quantity: 20,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 15,
  },
  {
    pk: "prod-5",
    store_pk: "store-2",
    title: "Leather Handbag",
    subtitle: "Premium leather accessory",
    description: "Handcrafted leather handbag with multiple compartments",
    price: 189.99,
    thumbnail:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
    stock_quantity: 25,
    status: "ACTIVE",
    is_digital: false,
    times_sold: 18,
  },
]);


const stores = reactive([
  {
    pk: "store-1",
    name: "Tech Haven",
    description: "Premium electronics and gadgets store",
    logo_url:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
    banner_url:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop",
    average_rating: 4.8,
    status: "ACTIVE",
    contact_phone: "+1234567890",
    contact_email: "tech@haven.com",
  },
  {
    pk: "store-2",
    name: "Fashion Forward",
    description: "Trendy clothing and accessories",
    logo_url:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
    banner_url:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=200&fit=crop",
    average_rating: 4.6,
    status: "ACTIVE",
    contact_phone: "+1234567891",
    contact_email: "fashion@forward.com",
  },
  {
    pk: "store-3",
    name: "Home & Garden",
    description: "Beautiful home decor and garden supplies",
    logo_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
    banner_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop",
    average_rating: 4.7,
    status: "ACTIVE",
    contact_phone: "+1234567892",
    contact_email: "home@garden.com",
  },
]);



const addOption = () => {
  newProduct.value.product_options.push({
    name: "",
    display_type: "dropdown",
    values: [""],
  });
};

const removeOption = (index) => {
  newProduct.value.product_options.splice(index, 1);
  if (this.enableVariants) {
    this.generateVariants();
  }
};

const addOptionValue = (optionIndex) => {
  newProduct.value.product_options[optionIndex].values.push("");
};

const removeOptionValue = (optionIndex, valueIndex) => {
  newProduct.value.product_options[optionIndex].values.splice(valueIndex, 1);
  if (enableVariants.value) {
    generateVariants();
  }
};

const generateCombinations = (options) => {
  if (options.length === 0) return [[]];

  const [first, ...rest] = options;
  const restCombinations = generateCombinations(rest);
  const validValues = first.values.filter((val) => val.trim());

  return validValues.flatMap((value) =>
    restCombinations.map((combo) => [value, ...combo])
  );
};

const generateVariants = () => {
  const options = newProduct.value.product_options.filter(
    (opt) => opt.name && opt.values.some((val) => val.trim())
  );

  if (options.length === 0) {
    newProduct.value.product_variants = [];
    return;
  }

  // Generate all combinations
  const combinations = generateCombinations(options);

  newProduct.value.product_variants = combinations.map((combo) => ({
    name: combo.join(" / "),
    price: newProduct.value.price || 0,
    compare_price: newProduct.value.compare_price || null,
    inventory: 0,
    option_values: combo,
  }));
};



const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  uploadImages(files);
  // Reset input so same file can be selected again
  event.target.value = "";
};

const handleDragOver = (event) => {
  event.currentTarget.classList.add("border-blue-400", "bg-blue-50");
};

const handleDragLeave = (event) => {
  event.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
};

const handleDrop = (event) => {
  event.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
  const files = Array.from(event.dataTransfer.files).filter((file) =>
    file.type.startsWith("image/")
  );
  if (files.length > 0) {
    uploadImages(files);
  }
};

const setMainImage = (index) => {
  // Remove main flag from all images
  newProduct.value.images.forEach((img) => (img.is_main = false));
  // Set selected image as main
  newProduct.value.images[index].is_main = true;
};

const getPresignedUrl = async (filename, contentType, resource) => {
  const response = await apiClient.get(`/utils/generate-upload-url?file_name=${filename}&file_type=${contentType}&resource=${resource}`)

  if (!response.ok) {
    throw new Error("Failed to get presigned URL");
  }
  return await response.data
};

const uploadToS3 = (presignedData, file, progressIndex) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        this.uploadProgress[progressIndex].progress = progress;
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200 || xhr.status === 204) {
        resolve({
          url: presignedData.url.split("?")[0], // Remove query params to get clean URL
        });
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Upload failed"));
    });

    // Create form data for S3 upload
    const formData = new FormData();

    // Add S3 form fields (these come from your presigned URL response)
    Object.keys(presignedData.fields || {}).forEach((key) => {
      formData.append(key, presignedData.fields[key]);
    });

    // Add the file last
    formData.append("file", file);

    xhr.open("POST", presignedData.url);
    xhr.send(formData);
  });
};

const uploadSingleImage = async (file, progressIndex) => {
  return new Promise((resolve, reject) => {
    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const extension = file.name.split(".").pop();
    const filename = `products/${timestamp}-${randomId}.${extension}`;

    // In a real application, you would get presigned URL from your backend
    // This is a simplified example - replace with your actual S3 upload logic
    getPresignedUrl(filename, file.type)
      .then((presignedData) => {
        return uploadToS3(presignedData, file, progressIndex);
      })
      .then((uploadResult) => {
        resolve({
          url: uploadResult.url,
          filename: filename,
          alt: file.name.replace(/\.[^/.]+$/, ""), // Remove extension for alt text
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const uploadImages = async (files) => {
  // Validate files
  const validFiles = files.filter((file) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert(`${file.name} is not a supported image format`);
      return false;
    }

    if (file.size > maxSize) {
      alert(`${file.name} is too large. Maximum size is 5MB`);
      return false;
    }

    return true;
  });

  if (validFiles.length === 0) return;

  uploading.value = true;

  // Initialize progress tracking
  validFiles.forEach((file, index) => {
    uploadProgress.value.push({
      name: file.name,
      progress: 0,
      status: "uploading",
      file: file,
    });
  });

  // Upload files concurrently
  const uploadPromises = validFiles.map((file, index) =>
    uploadSingleImage(file, index)
  );

  try {
    const results = await Promise.allSettled(uploadPromises);

    // Process results
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        // Add successful upload to images array
        newProduct.value.images.push({
          url: result.value.url,
          alt: result.value.alt || "",
          is_main: newProduct.value.images.length === 0, // First image is main
          filename: result.value.filename,
        });
        uploadProgress.value[index].status = "completed";
      } else {
        uploadProgress.value[index].status = "error";
        console.error("Upload failed:", result.reason);
      }
    });

    // Clear progress after 3 seconds
    setTimeout(() => {
      uploadProgress.value = uploadProgress.value.filter(
        (p) => p.status === "error"
      );
    }, 3000);
  } catch (error) {
    console.error("Upload error:", error);
    alert("Some images failed to upload. Please try again.");
  } finally {
    uploading.value = false;
  }
};

const retryUpload = async (progressIndex) => {
  const failedUpload = uploadProgress.value[progressIndex];
  if (failedUpload && failedUpload.file) {
    // Reset progress and retry
    failedUpload.progress = 0;
    failedUpload.status = "uploading";
    uploadSingleImage(failedUpload.file, progressIndex)
      .then((result) => {
        newProduct.value.images.push({
          url: result.url,
          alt: result.alt || "",
          is_main: newProduct.value.images.length === 0,
          filename: result.filename,
        });
        failedUpload.status = "completed";

        setTimeout(() => {
          const index = uploadProgress.value.indexOf(failedUpload);
          if (index > -1) {
            uploadProgress.value.splice(index, 1);
          }
        }, 2000);
      })
      .catch((error) => {
        failedUpload.status = "error";
        console.error("Retry failed:", error);
      });
  }
};

const deleteFromS3 = async (filename) => {
  // Replace with your actual API endpoint to delete from S3
  const response = await fetch(
    `/api/s3/delete/${encodeURIComponent(filename)}`,
    {
      method: "DELETE",
      headers: {
        // Add your authentication headers here
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete from S3");
  }
};

const removeImage = async (index) => {
  const image = newProduct.value.images[index];

  // Optionally delete from S3 (implement this based on your needs)
  try {
    await deleteFromS3(image.filename);
  } catch (error) {
    console.warn("Failed to delete image from S3:", error);
  }

  // Remove from local array
  newProduct.value.images.splice(index, 1);

  // If removed image was main and there are other images, make first one main
  if (image.is_main && newProduct.value.images.length > 0) {
    newProduct.value.images[0].is_main = true;
  }
};


</script>

<template>
    <div v-if="props.currentView === 'add-product'" class="space-y-6">
          <div class="flex items-center space-x-4 mb-6">
            <button
              @click="setCurrentView('products')"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <h3 class="text-xl font-semibold" style="color: #022b5f">
              Add New Product
            </h3>
          </div>

          <form @submit.prevent="createProduct" class="space-y-8">
            <!-- Basic Product Information -->
            <div class="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h4 class="text-lg font-medium text-gray-900 border-b pb-2">
                Basic Information
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Product Name *</label
                  >
                  <input
                    type="text"
                    v-model="newProduct.name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Store *</label
                  >
                  <select
                    v-model="newProduct.store_id"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    required
                  >
                    <option value="">Select store</option>
                    <option
                      v-for="store in stores"
                      :key="store.pk"
                      :value="store.pk"
                    >
                      {{ store.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Description</label
                >
                <textarea
                  v-model="newProduct.description"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Describe your product features, benefits, etc..."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Category</label
                  >
                  <select
                    v-model="newProduct.category"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports</option>
                    <option value="books">Books</option>
                    <option value="food">Food & Beverages</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Status</label
                  >
                  <select
                    v-model="newProduct.status"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Collection Assignment -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-900">Collection</h4>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="enableCollection"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-600"
                    >Assign to collection</span
                  >
                </label>
              </div>

              <div v-if="enableCollection" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Select Collection</label
                  >
                  <select
                    v-model="newProduct.collection_id"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    <option value="">Choose collection</option>
                    <option
                      v-for="collection in collections"
                      :key="collection.id"
                      :value="collection.id"
                    >
                      {{ collection.name }}
                    </option>
                  </select>
                </div>
                <p class="text-sm text-gray-500">
                  Collections help organize related products together for better
                  management and customer browsing.
                </p>
              </div>
            </div>

            <!-- Product Options -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-900">
                  Product Options
                </h4>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="enableOptions"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-600"
                    >Add product options</span
                  >
                </label>
              </div>

              <div v-if="enableOptions" class="space-y-4">
                <p class="text-sm text-gray-500 mb-4">
                  Product options allow customers to choose different attributes
                  like color, size, material, etc.
                </p>

                <div
                  v-for="(option, index) in newProduct.product_options"
                  :key="index"
                  class="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div class="flex items-center justify-between">
                    <h5 class="font-medium text-gray-800">
                      Option {{ index + 1 }}
                    </h5>
                    <button
                      type="button"
                      @click="removeOption(index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Option Name *</label
                      >
                      <input
                        type="text"
                        v-model="option.name"
                        placeholder="e.g., Color, Size, Material"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        required
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Display Type</label
                      >
                      <select
                        v-model="option.display_type"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      >
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio Buttons</option>
                        <option value="color">Color Swatches</option>
                        <option value="image">Image Swatches</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Option Values</label
                    >
                    <div class="space-y-2">
                      <div
                        v-for="(value, valueIndex) in option.values"
                        :key="valueIndex"
                        class="flex items-center space-x-2"
                      >
                        <input
                          type="text"
                          v-model="option.values[valueIndex]"
                          placeholder="Option value"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        />
                        <button
                          type="button"
                          @click="removeOptionValue(index, valueIndex)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <button
                        type="button"
                        @click="addOptionValue(index)"
                        class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <svg
                          class="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        Add Value
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="addOption"
                  class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  <svg
                    class="w-5 h-5 mx-auto mb-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Add New Option
                </button>
              </div>
            </div>

            <!-- Product Variants -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-900">
                  Product Variants
                </h4>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="enableVariants"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-600"
                    >Create product variants</span
                  >
                </label>
              </div>

              <div v-if="enableVariants" class="space-y-4">
                <div
                  v-if="!enableOptions"
                  class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <p class="text-sm text-yellow-800">
                    <strong>Note:</strong> Enable "Product Options" first to
                    create variants based on option combinations.
                  </p>
                </div>

                <div
                  v-else-if="newProduct.product_options.length === 0"
                  class="bg-blue-50 border border-blue-200 rounded-lg p-4"
                >
                  <p class="text-sm text-blue-800">
                    Add product options above to automatically generate variant
                    combinations.
                  </p>
                </div>

                <div v-else class="space-y-4">
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600">
                      Variants will be generated based on your product options.
                      You can customize pricing and inventory for each variant.
                    </p>
                    <button
                      type="button"
                      @click="generateVariants"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Generate Variants
                    </button>
                  </div>

                  <div
                    v-if="newProduct.product_variants.length > 0"
                    class="space-y-3"
                  >
                    <h5 class="font-medium text-gray-800">
                      Generated Variants ({{
                        newProduct.product_variants.length
                      }})
                    </h5>
                    <div class="max-h-96 overflow-y-auto space-y-3">
                      <div
                        v-for="(variant, index) in newProduct.product_variants"
                        :key="index"
                        class="border border-gray-200 rounded-lg p-4"
                      >
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                              >Variant Name</label
                            >
                            <input
                              type="text"
                              v-model="variant.name"
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                              readonly
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                              >Price *</label
                            >
                            <div class="relative">
                              <span
                                class="absolute left-3 top-2 text-gray-500 text-sm"
                                >$</span
                              >
                              <input
                                type="number"
                                v-model="variant.price"
                                step="0.01"
                                class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                              >Compare Price</label
                            >
                            <div class="relative">
                              <span
                                class="absolute left-3 top-2 text-gray-500 text-sm"
                                >$</span
                              >
                              <input
                                type="number"
                                v-model="variant.compare_price"
                                step="0.01"
                                class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-1"
                              >Inventory *</label
                            >
                            <input
                              type="number"
                              v-model="variant.inventory"
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Default Pricing (when no variants) -->
            <div
              v-if="!enableVariants"
              class="bg-white rounded-xl shadow-sm p-6 space-y-6"
            >
              <h4 class="text-lg font-medium text-gray-900 border-b pb-2">
                Pricing & Inventory
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Price *</label
                  >
                  <div class="relative">
                    <span class="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      v-model="newProduct.price"
                      step="0.01"
                      class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Compare Price</label
                  >
                  <div class="relative">
                    <span class="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      v-model="newProduct.compare_price"
                      step="0.01"
                      class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Inventory *</label
                  >
                  <input
                    type="number"
                    v-model="newProduct.inventory"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Product Images -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">
                Product Images
              </h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Existing Images -->
                <div
                  v-for="(image, index) in newProduct.images"
                  :key="index"
                  class="relative border border-gray-200 rounded-lg overflow-hidden group"
                >
                  <img
                    :src="image.url"
                    :alt="image.alt || 'Product image'"
                    class="w-full h-32 object-cover"
                  />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <button
                      type="button"
                      @click="setMainImage(index)"
                      :class="[
                        'px-2 py-1 text-xs rounded text-white',
                        image.is_main
                          ? 'bg-green-600'
                          : 'bg-blue-600 hover:bg-blue-700',
                      ]"
                    >
                      {{ image.is_main ? "Main" : "Set Main" }}
                    </button>
                    <button
                      type="button"
                      @click="removeImage(index)"
                      class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                    >
                      Delete
                    </button>
                  </div>
                  <div v-if="image.is_main" class="absolute top-2 left-2">
                    <span
                      class="bg-green-600 text-white text-xs px-2 py-1 rounded"
                      >Main</span
                    >
                  </div>
                </div>

                <!-- Upload Area -->
                <div
                  class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer relative"
                  @click="triggerFileInput"
                  @dragover.prevent="handleDragOver"
                  @dragleave.prevent="handleDragLeave"
                  @drop.prevent="handleDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  <div v-if="!uploading">
                    <svg
                      class="w-8 h-8 text-gray-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p class="text-sm text-gray-500">Add Image</p>
                    <p class="text-xs text-gray-400 mt-1">
                      Click or drag files here
                    </p>
                  </div>
                  <div v-else class="flex flex-col items-center">
                    <div
                      class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"
                    ></div>
                    <p class="text-sm text-gray-500">Uploading...</p>
                  </div>
                </div>
              </div>

              <!-- Upload Progress -->
              <div v-if="uploadProgress.length > 0" class="mt-4 space-y-2">
                <h5 class="text-sm font-medium text-gray-700">
                  Upload Progress
                </h5>
                <div
                  v-for="(progress, index) in uploadProgress"
                  :key="index"
                  class="flex items-center space-x-3"
                >
                  <div class="flex-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-600">{{ progress.name }}</span>
                      <span class="text-gray-500"
                        >{{ Math.round(progress.progress) }}%</span
                      >
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: progress.progress + '%' }"
                      ></div>
                    </div>
                  </div>
                  <button
                    v-if="progress.status === 'error'"
                    @click="retryUpload(index)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>

              <!-- Image Guidelines -->
              <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600">
                  <strong>Image Guidelines:</strong>
                  Upload high-quality images (min 800x800px). Supported formats:
                  JPG, PNG, WebP. Max 5MB per image.
                </p>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                @click="currentView = 'products'"
                class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 text-white font-medium rounded-lg transition-colors hover:opacity-90"
                style="background-color: #fbb03b"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
</template>