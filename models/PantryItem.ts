import mongoose from "mongoose";

const PantryItemSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: ['g', 'kg', 'ml', 'l', 'unit', 'tbsp', 'tsp', 'cup', 'oz', 'lb', 'pt', 'qt', 'gal', 'fl oz', 'pint', 'quart', 'gallon', 'milliliter', 'liter'],
        required: true
    },
    expiry: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ['Fruit', 'Vegetable', 'Meat', 'Dairy', 'Grain', 'Spice', 'Other'],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true,
});

// PantryItemSchema.statics.getCategories = function() {
//     return this.schema.path('category').options.enumValues;
// };

const PantryItem = mongoose.models.PantryItem || mongoose.model("PantryItem", PantryItemSchema);

export default PantryItem;