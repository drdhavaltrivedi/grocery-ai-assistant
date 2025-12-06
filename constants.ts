
import { InventoryItem, Message } from './types';

// Full inventory provided by user
const RAW_INVENTORY = {
    products: [
        // Rice
        { skuId: "RICE_IG_1KG", productName: "rice", brand: "India Gate", packSize: "1 kg" },
        { skuId: "RICE_IG_5KG", productName: "rice", brand: "India Gate", packSize: "5 kg" },
        { skuId: "RICE_IG_10KG", productName: "rice", brand: "India Gate", packSize: "10 kg" },
        { skuId: "RICE_IG_25KG", productName: "rice", brand: "India Gate", packSize: "25 kg" },
        { skuId: "RICE_DA_1KG", productName: "rice", brand: "Daawat", packSize: "1 kg" },
        { skuId: "RICE_DA_5KG", productName: "rice", brand: "Daawat", packSize: "5 kg" },
        { skuId: "RICE_DA_25KG", productName: "rice", brand: "Daawat", packSize: "25 kg" },
        { skuId: "RICE_FO_1KG", productName: "rice", brand: "Fortune", packSize: "1 kg" },
        { skuId: "RICE_FO_5KG", productName: "rice", brand: "Fortune", packSize: "5 kg" },
        { skuId: "RICE_KO_1KG", productName: "rice", brand: "Kohinoor", packSize: "1 kg" },
        { skuId: "RICE_KO_5KG", productName: "rice", brand: "Kohinoor", packSize: "5 kg" },
        { skuId: "RICE_LQ_1KG", productName: "rice", brand: "Lal Qilla", packSize: "1 kg" },
        { skuId: "RICE_LQ_5KG", productName: "rice", brand: "Lal Qilla", packSize: "5 kg" },

        // Atta
        { skuId: "ATTA_AA_1KG", productName: "atta", brand: "Aashirvaad", packSize: "1 kg" },
        { skuId: "ATTA_AA_2KG", productName: "atta", brand: "Aashirvaad", packSize: "2 kg" },
        { skuId: "ATTA_AA_5KG", productName: "atta", brand: "Aashirvaad", packSize: "5 kg" },
        { skuId: "ATTA_AA_10KG", productName: "atta", brand: "Aashirvaad", packSize: "10 kg" },
        { skuId: "ATTA_PI_1KG", productName: "atta", brand: "Pillsbury", packSize: "1 kg" },
        { skuId: "ATTA_PI_5KG", productName: "atta", brand: "Pillsbury", packSize: "5 kg" },
        { skuId: "ATTA_PI_10KG", productName: "atta", brand: "Pillsbury", packSize: "10 kg" },
        { skuId: "ATTA_FO_1KG", productName: "atta", brand: "Fortune", packSize: "1 kg" },
        { skuId: "ATTA_FO_5KG", productName: "atta", brand: "Fortune", packSize: "5 kg" },
        { skuId: "ATTA_FO_10KG", productName: "atta", brand: "Fortune", packSize: "10 kg" },
        { skuId: "ATTA_NF_5KG", productName: "atta", brand: "Nature Fresh", packSize: "5 kg" },
        { skuId: "ATTA_SB_5KG", productName: "atta", brand: "Shakti Bhog", packSize: "5 kg" },

        // Dal
        { skuId: "DAL_TOOR_TS_1KG", productName: "toor dal", brand: "Tata Sampann", packSize: "1 kg" },
        { skuId: "DAL_TOOR_TS_500G", productName: "toor dal", brand: "Tata Sampann", packSize: "500 g" },
        { skuId: "DAL_TOOR_RJ_1KG", productName: "toor dal", brand: "Rajdhani", packSize: "1 kg" },
        { skuId: "DAL_TOOR_OT_1KG", productName: "toor dal", brand: "Organic Tattva", packSize: "1 kg" },
        { skuId: "DAL_MOONG_TS_1KG", productName: "moong dal", brand: "Tata Sampann", packSize: "1 kg" },
        { skuId: "DAL_MOONG_RJ_1KG", productName: "moong dal", brand: "Rajdhani", packSize: "1 kg" },
        { skuId: "DAL_CHANA_TS_1KG", productName: "chana dal", brand: "Tata Sampann", packSize: "1 kg" },
        { skuId: "DAL_CHANA_24_1KG", productName: "chana dal", brand: "24 Mantra", packSize: "1 kg" },

        // Oil
        { skuId: "OIL_FO_1L", productName: "oil", brand: "Fortune", packSize: "1 liter" },
        { skuId: "OIL_FO_5L", productName: "oil", brand: "Fortune", packSize: "5 liter" },
        { skuId: "OIL_FO_15L", productName: "oil", brand: "Fortune", packSize: "15 liter" },
        { skuId: "OIL_SA_1L", productName: "oil", brand: "Saffola", packSize: "1 liter" },
        { skuId: "OIL_SA_5L", productName: "oil", brand: "Saffola", packSize: "5 liter" },
        { skuId: "OIL_SA_15L", productName: "oil", brand: "Saffola", packSize: "15 liter" },
        { skuId: "OIL_DH_1L", productName: "oil", brand: "Dhara", packSize: "1 liter" },
        { skuId: "OIL_EM_1L", productName: "oil", brand: "Emami", packSize: "1 liter" },
        { skuId: "OIL_SU_1L", productName: "oil", brand: "Sundrop", packSize: "1 liter" },
        { skuId: "OIL_SU_5L", productName: "oil", brand: "Sundrop", packSize: "5 liter" },

        // Milk
        { skuId: "MILK_AM_500ML", productName: "milk", brand: "Amul", packSize: "500 ml" },
        { skuId: "MILK_AM_1L", productName: "milk", brand: "Amul", packSize: "1 liter" },
        { skuId: "MILK_MD_500ML", productName: "milk", brand: "Mother Dairy", packSize: "500 ml" },
        { skuId: "MILK_MD_1L", productName: "milk", brand: "Mother Dairy", packSize: "1 liter" },
        { skuId: "MILK_NE_1L", productName: "milk", brand: "Nestle", packSize: "1 liter" },
        { skuId: "MILK_GO_1L", productName: "milk", brand: "Gowardhan", packSize: "1 liter" },

        // Butter
        { skuId: "BUTTER_AM_100G", productName: "butter", brand: "Amul", packSize: "100 g" },
        { skuId: "BUTTER_AM_500G", productName: "butter", brand: "Amul", packSize: "500 g" },
        { skuId: "BUTTER_BR_100G", productName: "butter", brand: "Britannia", packSize: "100 g" },
        { skuId: "BUTTER_BR_500G", productName: "butter", brand: "Britannia", packSize: "500 g" },
        { skuId: "BUTTER_GO_500G", productName: "butter", brand: "Go", packSize: "500 g" },

        // Tea & Coffee
        { skuId: "TEA_TT_250G", productName: "tea", brand: "Tata Tea", packSize: "250 g" },
        { skuId: "TEA_TT_500G", productName: "tea", brand: "Tata Tea", packSize: "500 g" },
        { skuId: "TEA_TT_1KG", productName: "tea", brand: "Tata Tea", packSize: "1 kg" },
        { skuId: "TEA_RL_250G", productName: "tea", brand: "Red Label", packSize: "250 g" },
        { skuId: "TEA_RL_500G", productName: "tea", brand: "Red Label", packSize: "500 g" },
        { skuId: "TEA_TM_250G", productName: "tea", brand: "Taj Mahal", packSize: "250 g" },
        { skuId: "TEA_WB_250G", productName: "tea", brand: "Wagh Bakri", packSize: "250 g" },
        { skuId: "TEA_TE_250G", productName: "tea", brand: "Tetley", packSize: "250 g" },
        { skuId: "COFFEE_NE_50G", productName: "coffee", brand: "Nescafe", packSize: "50 g" },
        { skuId: "COFFEE_NE_100G", productName: "coffee", brand: "Nescafe", packSize: "100 g" },
        { skuId: "COFFEE_NE_200G", productName: "coffee", brand: "Nescafe", packSize: "200 g" },
        { skuId: "COFFEE_BR_50G", productName: "coffee", brand: "Bru", packSize: "50 g" },
        { skuId: "COFFEE_BR_100G", productName: "coffee", brand: "Bru", packSize: "100 g" },
        { skuId: "COFFEE_DA_100G", productName: "coffee", brand: "Davidoff", packSize: "100 g" },

        // Sugar & Salt
        { skuId: "SUGAR_MA_1KG", productName: "sugar", brand: "Madhur", packSize: "1 kg" },
        { skuId: "SUGAR_MA_5KG", productName: "sugar", brand: "Madhur", packSize: "5 kg" },
        { skuId: "SUGAR_TR_1KG", productName: "sugar", brand: "Trust", packSize: "1 kg" },
        { skuId: "SUGAR_MW_1KG", productName: "sugar", brand: "Mawana", packSize: "1 kg" },
        { skuId: "SALT_TA_1KG", productName: "salt", brand: "Tata", packSize: "1 kg" },
        { skuId: "SALT_AA_1KG", productName: "salt", brand: "Aashirvaad", packSize: "1 kg" },
        { skuId: "SALT_SA_1KG", productName: "salt", brand: "Saffola", packSize: "1 kg" },

        // Spices
        { skuId: "SPICE_EV_CHICKEN_100G", productName: "chicken masala", brand: "Everest", packSize: "100 g" },
        { skuId: "SPICE_EV_GARAM_100G", productName: "garam masala", brand: "Everest", packSize: "100 g" },
        { skuId: "SPICE_MDH_CHICKEN_100G", productName: "chicken masala", brand: "MDH", packSize: "100 g" },
        { skuId: "SPICE_MDH_GARAM_100G", productName: "garam masala", brand: "MDH", packSize: "100 g" },
        { skuId: "SPICE_CA_TURMERIC_100G", productName: "turmeric powder", brand: "Catch", packSize: "100 g" },
        { skuId: "SPICE_EA_SAMBAR_100G", productName: "sambar masala", brand: "Eastern", packSize: "100 g" },

        // Biscuits
        { skuId: "BISC_BR_MARIE_200G", productName: "biscuits", brand: "Britannia", packSize: "200 g" },
        { skuId: "BISC_BR_GOODDAY_100G", productName: "biscuits", brand: "Britannia", packSize: "100 g" },
        { skuId: "BISC_BR_5050_100G", productName: "biscuits", brand: "Britannia", packSize: "100 g" },
        { skuId: "BISC_BR_NUTRI_100G", productName: "biscuits", brand: "Britannia", packSize: "100 g" },
        { skuId: "BISC_PA_G_100G", productName: "biscuits", brand: "Parle", packSize: "100 g" },
        { skuId: "BISC_PA_HIDE_100G", productName: "biscuits", brand: "Parle", packSize: "100 g" },
        { skuId: "BISC_PA_MONACO_100G", productName: "biscuits", brand: "Parle", packSize: "100 g" },
        { skuId: "BISC_PA_KRACKJACK_100G", productName: "biscuits", brand: "Parle", packSize: "100 g" },
        { skuId: "BISC_SF_MOM_100G", productName: "biscuits", brand: "Sunfeast", packSize: "100 g" },
        { skuId: "BISC_SF_DARK_100G", productName: "biscuits", brand: "Sunfeast", packSize: "100 g" },
        { skuId: "BISC_MC_DIG_100G", productName: "biscuits", brand: "McVities", packSize: "100 g" },

        // Snacks & Chocolates
        { skuId: "SNACK_LA_CLASSIC_50G", productName: "chips", brand: "Lays", packSize: "50 g" },
        { skuId: "SNACK_LA_ONION_50G", productName: "chips", brand: "Lays", packSize: "50 g" },
        { skuId: "SNACK_KU_MASALA_50G", productName: "chips", brand: "Kurkure", packSize: "50 g" },
        { skuId: "SNACK_HA_BHUJIA_200G", productName: "namkeen", brand: "Haldiram", packSize: "200 g" },
        { skuId: "SNACK_BA_WAFERS_100G", productName: "chips", brand: "Balaji", packSize: "100 g" },
        { skuId: "CHOC_CA_DAIRY_50G", productName: "chocolate", brand: "Cadbury", packSize: "50 g" },
        { skuId: "CHOC_CA_SILK_150G", productName: "chocolate", brand: "Cadbury", packSize: "150 g" },
        { skuId: "CHOC_NE_KITKAT_50G", productName: "chocolate", brand: "Nestle", packSize: "50 g" },
        { skuId: "CHOC_AM_DARK_150G", productName: "chocolate", brand: "Amul", packSize: "150 g" },

        // Personal Care
        { skuId: "SOAP_LU_100G", productName: "soap", brand: "Lux", packSize: "100 g" },
        { skuId: "SOAP_LU_3X100G", productName: "soap", brand: "Lux", packSize: "3x100 g" },
        { skuId: "SOAP_LU_5X100G", productName: "soap", brand: "Lux", packSize: "5x100 g" },
        { skuId: "SOAP_DE_100G", productName: "soap", brand: "Dettol", packSize: "100 g" },
        { skuId: "SOAP_DE_3X100G", productName: "soap", brand: "Dettol", packSize: "3x100 g" },
        { skuId: "SOAP_DO_100G", productName: "soap", brand: "Dove", packSize: "100 g" },
        { skuId: "SOAP_DO_3X100G", productName: "soap", brand: "Dove", packSize: "3x100 g" },
        { skuId: "SOAP_PE_100G", productName: "soap", brand: "Pears", packSize: "100 g" },
        { skuId: "SOAP_PE_3X100G", productName: "soap", brand: "Pears", packSize: "3x100 g" },
        { skuId: "SOAP_LI_100G", productName: "soap", brand: "Lifebuoy", packSize: "100 g" },
        { skuId: "SHAM_DO_180ML", productName: "shampoo", brand: "Dove", packSize: "180 ml" },
        { skuId: "SHAM_DO_340ML", productName: "shampoo", brand: "Dove", packSize: "340 ml" },
        { skuId: "SHAM_DO_650ML", productName: "shampoo", brand: "Dove", packSize: "650 ml" },
        { skuId: "SHAM_PA_180ML", productName: "shampoo", brand: "Pantene", packSize: "180 ml" },
        { skuId: "SHAM_PA_650ML", productName: "shampoo", brand: "Pantene", packSize: "650 ml" },
        { skuId: "SHAM_HS_180ML", productName: "shampoo", brand: "Head & Shoulders", packSize: "180 ml" },
        { skuId: "SHAM_HS_650ML", productName: "shampoo", brand: "Head & Shoulders", packSize: "650 ml" },
        { skuId: "SHAM_SU_180ML", productName: "shampoo", brand: "Sunsilk", packSize: "180 ml" },
        { skuId: "SHAM_TR_180ML", productName: "shampoo", brand: "Tresemme", packSize: "180 ml" },
        { skuId: "PASTE_CO_50G", productName: "toothpaste", brand: "Colgate", packSize: "50 g" },
        { skuId: "PASTE_CO_100G", productName: "toothpaste", brand: "Colgate", packSize: "100 g" },
        { skuId: "PASTE_CO_MAX_100G", productName: "toothpaste", brand: "Colgate", packSize: "100 g" },
        { skuId: "PASTE_CO_200G", productName: "toothpaste", brand: "Colgate", packSize: "200 g" },
        { skuId: "PASTE_PE_100G", productName: "toothpaste", brand: "Pepsodent", packSize: "100 g" },
        { skuId: "PASTE_SE_50G", productName: "toothpaste", brand: "Sensodyne", packSize: "50 g" },
        { skuId: "PASTE_SE_100G", productName: "toothpaste", brand: "Sensodyne", packSize: "100 g" },
        { skuId: "PASTE_CU_100G", productName: "toothpaste", brand: "Close Up", packSize: "100 g" },

        // Cleaning
        { skuId: "DET_SU_1KG", productName: "detergent", brand: "Surf Excel", packSize: "1 kg" },
        { skuId: "DET_SU_500G", productName: "detergent", brand: "Surf Excel", packSize: "500 g" },
        { skuId: "DET_SU_LIQ_1L", productName: "detergent liquid", brand: "Surf Excel", packSize: "1 liter" },
        { skuId: "DET_AR_1KG", productName: "detergent", brand: "Ariel", packSize: "1 kg" },
        { skuId: "DET_TI_1KG", productName: "detergent", brand: "Tide", packSize: "1 kg" },
        { skuId: "DET_RI_1KG", productName: "detergent", brand: "Rin", packSize: "1 kg" },
        { skuId: "DISH_VI_BAR_500G", productName: "dishwash bar", brand: "Vim", packSize: "500 g" },
        { skuId: "DISH_VI_LIQ_500ML", productName: "dishwash liquid", brand: "Vim", packSize: "500 ml" },
        { skuId: "DISH_PR_LIQ_500ML", productName: "dishwash liquid", brand: "Pril", packSize: "500 ml" },
        { skuId: "DISH_EX_BAR_500G", productName: "dishwash bar", brand: "Exo", packSize: "500 g" },
        { skuId: "CLEAN_LI_500ML", productName: "floor cleaner", brand: "Lizol", packSize: "500 ml" },
        { skuId: "CLEAN_LI_1L", productName: "floor cleaner", brand: "Lizol", packSize: "1 liter" },
        { skuId: "CLEAN_HA_500ML", productName: "toilet cleaner", brand: "Harpic", packSize: "500 ml" },
        { skuId: "CLEAN_CO_500ML", productName: "glass cleaner", brand: "Colin", packSize: "500 ml" },

        // Drinks & Beverages
        { skuId: "JUICE_RE_1L", productName: "juice", brand: "Real", packSize: "1 liter" },
        { skuId: "JUICE_RE_200ML", productName: "juice", brand: "Real", packSize: "200 ml" },
        { skuId: "JUICE_TR_1L", productName: "juice", brand: "Tropicana", packSize: "1 liter" },
        { skuId: "JUICE_TR_200ML", productName: "juice", brand: "Tropicana", packSize: "200 ml" },
        { skuId: "DRINK_CO_750ML", productName: "coke", brand: "Coca Cola", packSize: "750 ml" },
        { skuId: "DRINK_PE_750ML", productName: "pepsi", brand: "Pepsi", packSize: "750 ml" },
        { skuId: "DRINK_SP_750ML", productName: "sprite", brand: "Sprite", packSize: "750 ml" },
        { skuId: "DRINK_TH_750ML", productName: "thums up", brand: "Thums Up", packSize: "750 ml" },
        { skuId: "DRINK_MA_600ML", productName: "maaza", brand: "Maaza", packSize: "600 ml" },
        { skuId: "DRINK_SL_600ML", productName: "slice", brand: "Slice", packSize: "600 ml" },
        { skuId: "EN_RB_250ML", productName: "energy drink", brand: "Red Bull", packSize: "250 ml" },
        { skuId: "EN_MO_350ML", productName: "energy drink", brand: "Monster", packSize: "350 ml" },
        { skuId: "HD_BO_500G", productName: "bournvita", brand: "Cadbury", packSize: "500 g" },
        { skuId: "HD_BO_WOM_400G", productName: "bournvita women", brand: "Cadbury", packSize: "400 g" },
        { skuId: "HD_HO_500G", productName: "horlicks", brand: "Horlicks", packSize: "500 g" },
        { skuId: "HD_CO_500G", productName: "complan", brand: "Complan", packSize: "500 g" },

        // Breakfast & Misc
        { skuId: "DRY_ALMOND_250G", productName: "almonds", brand: "Happilo", packSize: "250 g" },
        { skuId: "DRY_ALMOND_500G", productName: "almonds", brand: "Happilo", packSize: "500 g" },
        { skuId: "DRY_CASHEW_250G", productName: "cashews", brand: "Happilo", packSize: "250 g" },
        { skuId: "DRY_RAISIN_250G", productName: "raisins", brand: "Happilo", packSize: "250 g" },
        { skuId: "NOOD_MA_70G", productName: "noodles", brand: "Maggi", packSize: "70 g" },
        { skuId: "NOOD_MA_140G", productName: "noodles", brand: "Maggi", packSize: "140 g" },
        { skuId: "NOOD_MA_280G", productName: "noodles", brand: "Maggi", packSize: "280 g" },
        { skuId: "NOOD_YI_70G", productName: "noodles", brand: "Yippee", packSize: "70 g" },
        { skuId: "KET_KI_500G", productName: "ketchup", brand: "Kissan", packSize: "500 g" },
        { skuId: "KET_KI_1KG", productName: "ketchup", brand: "Kissan", packSize: "1 kg" },
        { skuId: "KET_HE_500G", productName: "ketchup", brand: "Heinz", packSize: "500 g" },
        { skuId: "JAM_KI_500G", productName: "jam", brand: "Kissan", packSize: "500 g" },
        { skuId: "JAM_KI_700G", productName: "jam", brand: "Kissan", packSize: "700 g" },
        { skuId: "HON_DA_500G", productName: "honey", brand: "Dabur", packSize: "500 g" },
        { skuId: "HON_DA_1KG", productName: "honey", brand: "Dabur", packSize: "1 kg" },
        { skuId: "HON_SA_500G", productName: "honey", brand: "Saffola", packSize: "500 g" },
        { skuId: "CORN_KE_475G", productName: "cornflakes", brand: "Kelloggs", packSize: "475 g" },
        { skuId: "CORN_KE_CHO_300G", productName: "chocos", brand: "Kelloggs", packSize: "300 g" },
        { skuId: "CORN_KE_MUESLI_500G", productName: "muesli", brand: "Kelloggs", packSize: "500 g" },
        { skuId: "OATS_QU_1KG", productName: "oats", brand: "Quaker", packSize: "1 kg" },
        { skuId: "OATS_SA_1KG", productName: "oats", brand: "Saffola", packSize: "1 kg" },
        { skuId: "OATS_SA_MASALA_40G", productName: "masala oats", brand: "Saffola", packSize: "40 g" },
        { skuId: "PASTA_BA_500G", productName: "pasta", brand: "Bambino", packSize: "500 g" },
        { skuId: "PASTA_SU_500G", productName: "pasta", brand: "Sunfeast", packSize: "500 g" },
        { skuId: "VERM_BA_400G", productName: "vermicelli", brand: "Bambino", packSize: "400 g" },
        { skuId: "VERM_MTR_400G", productName: "vermicelli", brand: "MTR", packSize: "400 g" },
        { skuId: "RTE_MTR_PANEER_300G", productName: "ready to eat paneer", brand: "MTR", packSize: "300 g" },
        { skuId: "RTE_MTR_DAL_300G", productName: "ready to eat dal", brand: "MTR", packSize: "300 g" },
        { skuId: "RTE_ITC_DAL_300G", productName: "ready to eat dal", brand: "Kitchens of India", packSize: "300 g" },
        { skuId: "PICK_MO_MANGO_300G", productName: "mango pickle", brand: "Mothers", packSize: "300 g" },
        { skuId: "PICK_MO_MIX_300G", productName: "mixed pickle", brand: "Mothers", packSize: "300 g" },
        { skuId: "PICK_PR_MANGO_300G", productName: "mango pickle", brand: "Priya", packSize: "300 g" },
        { skuId: "PAPAD_LI_200G", productName: "papad", brand: "Lijjat", packSize: "200 g" },
        { skuId: "PAPAD_MO_200G", productName: "papad", brand: "Mothers", packSize: "200 g" },
        { skuId: "SOYA_NU_200G", productName: "soya chunks", brand: "Nutrela", packSize: "200 g" },
        { skuId: "SOYA_FO_200G", productName: "soya chunks", brand: "Fortune", packSize: "200 g" },
        { skuId: "BESAN_FO_500G", productName: "besan", brand: "Fortune", packSize: "500 g" },
        { skuId: "BESAN_TA_500G", productName: "besan", brand: "Tata Sampann", packSize: "500 g" },
        { skuId: "BESAN_RA_500G", productName: "besan", brand: "Rajdhani", packSize: "500 g" },
        { skuId: "MAIDA_RA_500G", productName: "maida", brand: "Rajdhani", packSize: "500 g" },
        { skuId: "MAIDA_FO_500G", productName: "maida", brand: "Fortune", packSize: "500 g" },
        { skuId: "SUJI_RA_500G", productName: "suji", brand: "Rajdhani", packSize: "500 g" },
        { skuId: "SUJI_FO_500G", productName: "suji", brand: "Fortune", packSize: "500 g" },
        { skuId: "POHA_TA_500G", productName: "poha", brand: "Tata Sampann", packSize: "500 g" },
        { skuId: "POHA_RA_500G", productName: "poha", brand: "Rajdhani", packSize: "500 g" },
        { skuId: "PEA_HA_200G", productName: "peanuts", brand: "Haldiram", packSize: "200 g" },
        { skuId: "PEA_BA_200G", productName: "peanuts", brand: "Balaji", packSize: "200 g" },
        { skuId: "POP_AC_BUTTER_3", productName: "popcorn", brand: "Act II", packSize: "3 packs" },
        { skuId: "POP_AC_MASALA_3", productName: "popcorn", brand: "Act II", packSize: "3 packs" },

        // House & Hygiene
        { skuId: "HAND_DE_200ML", productName: "handwash", brand: "Dettol", packSize: "200 ml" },
        { skuId: "HAND_DE_REF_750ML", productName: "handwash refill", brand: "Dettol", packSize: "750 ml" },
        { skuId: "HAND_LI_200ML", productName: "handwash", brand: "Lifebuoy", packSize: "200 ml" },
        { skuId: "SANI_DE_50ML", productName: "sanitizer", brand: "Dettol", packSize: "50 ml" },
        { skuId: "SANI_DE_200ML", productName: "sanitizer", brand: "Dettol", packSize: "200 ml" },
        { skuId: "DIA_PA_S_10", productName: "diapers", brand: "Pampers", packSize: "10 pcs" },
        { skuId: "DIA_PA_M_10", productName: "diapers", brand: "Pampers", packSize: "10 pcs" },
        { skuId: "DIA_PA_L_10", productName: "diapers", brand: "Pampers", packSize: "10 pcs" },
        { skuId: "DIA_MA_S_10", productName: "diapers", brand: "MamyPoko", packSize: "10 pcs" },
        { skuId: "SHAVE_GI_FOAM_200G", productName: "shaving foam", brand: "Gillette", packSize: "200 g" },
        { skuId: "SHAVE_GI_RAZOR_1", productName: "razor", brand: "Gillette", packSize: "1 pc" },
        { skuId: "DEO_AX_150ML", productName: "deodorant", brand: "Axe", packSize: "150 ml" },
        { skuId: "DEO_FO_150ML", productName: "deodorant", brand: "Fogg", packSize: "150 ml" },
        { skuId: "DEO_NI_150ML", productName: "deodorant", brand: "Nivea", packSize: "150 ml" },
        { skuId: "FACE_HI_100ML", productName: "face wash", brand: "Himalaya", packSize: "100 ml" },
        { skuId: "FACE_HI_150ML", productName: "face wash", brand: "Himalaya", packSize: "150 ml" },
        { skuId: "FACE_GA_100ML", productName: "face wash", brand: "Garnier", packSize: "100 ml" },
        { skuId: "HOIL_PA_200ML", productName: "hair oil", brand: "Parachute", packSize: "200 ml" },
        { skuId: "HOIL_PA_500ML", productName: "hair oil", brand: "Parachute", packSize: "500 ml" },
        { skuId: "HOIL_DA_200ML", productName: "hair oil", brand: "Dabur Amla", packSize: "200 ml" },
        { skuId: "TALC_PO_100G", productName: "talcum powder", brand: "Ponds", packSize: "100 g" },
        { skuId: "TALC_NY_100G", productName: "talcum powder", brand: "Nycil", packSize: "100 g" },
        { skuId: "MOS_GO_REF_45ML", productName: "mosquito repellent refill", brand: "Good Knight", packSize: "45 ml" },
        { skuId: "MOS_AL_REF_45ML", productName: "mosquito repellent refill", brand: "All Out", packSize: "45 ml" },
        { skuId: "BAT_DU_AA_4", productName: "batteries AA", brand: "Duracell", packSize: "4 pcs" },
        { skuId: "BAT_DU_AAA_4", productName: "batteries AAA", brand: "Duracell", packSize: "4 pcs" },
        { skuId: "BAT_EV_AA_4", productName: "batteries AA", brand: "Eveready", packSize: "4 pcs" },
        { skuId: "BULB_PH_9W", productName: "led bulb", brand: "Philips", packSize: "9W" },
        { skuId: "BULB_PH_12W", productName: "led bulb", brand: "Philips", packSize: "12W" },
        { skuId: "BULB_WI_9W", productName: "led bulb", brand: "Wipro", packSize: "9W" },
        { skuId: "BAG_SH_M_30", productName: "garbage bags medium", brand: "Shalimar", packSize: "30 pcs" },
        { skuId: "BAG_SH_L_15", productName: "garbage bags large", brand: "Shalimar", packSize: "15 pcs" },
        { skuId: "FOIL_HI_9M", productName: "aluminium foil", brand: "Hindalco", packSize: "9 m" },
        { skuId: "FOIL_HI_18M", productName: "aluminium foil", brand: "Hindalco", packSize: "18 m" },
        { skuId: "TISS_OR_100", productName: "tissues", brand: "Origami", packSize: "100 pulls" },
        { skuId: "TISS_PA_100", productName: "tissues", brand: "Paseo", packSize: "100 pulls" },
        { skuId: "TP_OR_4", productName: "toilet paper", brand: "Origami", packSize: "4 rolls" },
        { skuId: "TP_SE_4", productName: "toilet paper", brand: "Selpak", packSize: "4 rolls" },
        { skuId: "AIR_GO_10G", productName: "air freshener", brand: "Godrej Aer", packSize: "10 g" },
        { skuId: "AIR_OD_50G", productName: "air freshener", brand: "Odonil", packSize: "50 g" },
        { skuId: "SHOE_CH_BL_40G", productName: "shoe polish black", brand: "Cherry Blossom", packSize: "40 g" },
        { skuId: "SHOE_CH_BR_40G", productName: "shoe polish brown", brand: "Cherry Blossom", packSize: "40 g" },
        { skuId: "GLUE_FE_30G", productName: "glue stick", brand: "Fevistik", packSize: "8 g" },
        { skuId: "GLUE_FE_COL_50G", productName: "glue", brand: "Fevicol", packSize: "50 g" },
        { skuId: "PEN_CE_5", productName: "ball pens", brand: "Cello", packSize: "5 pcs" },
        { skuId: "PEN_RE_5", productName: "ball pens", brand: "Reynolds", packSize: "5 pcs" },
        { skuId: "NOTE_CL_172", productName: "notebook", brand: "Classmate", packSize: "172 pages" },
        { skuId: "NOTE_NA_172", productName: "notebook", brand: "Navneet", packSize: "172 pages" },

        // Dairy & Perishables
        { skuId: "CURD_AM_400G", productName: "curd", brand: "Amul", packSize: "400 g" },
        { skuId: "CURD_MD_400G", productName: "curd", brand: "Mother Dairy", packSize: "400 g" },
        { skuId: "CURD_GO_400G", productName: "curd", brand: "Gowardhan", packSize: "400 g" },
        { skuId: "PAN_AM_200G", productName: "paneer", brand: "Amul", packSize: "200 g" },
        { skuId: "PAN_MD_200G", productName: "paneer", brand: "Mother Dairy", packSize: "200 g" },
        { skuId: "PAN_GO_200G", productName: "paneer", brand: "Gowardhan", packSize: "200 g" },
        { skuId: "CREAM_AM_250ML", productName: "fresh cream", brand: "Amul", packSize: "250 ml" },
        { skuId: "CREAM_MD_200ML", productName: "fresh cream", brand: "Mother Dairy", packSize: "200 ml" },
        { skuId: "GHEE_AM_1L", productName: "ghee", brand: "Amul", packSize: "1 liter" },
        { skuId: "GHEE_AM_500ML", productName: "ghee", brand: "Amul", packSize: "500 ml" },
        { skuId: "GHEE_GO_1L", productName: "ghee", brand: "Gowardhan", packSize: "1 liter" },
        { skuId: "GHEE_MD_1L", productName: "ghee", brand: "Mother Dairy", packSize: "1 liter" },
        { skuId: "GHEE_PA_1L", productName: "ghee", brand: "Patanjali", packSize: "1 liter" },
        { skuId: "WAT_BI_1L", productName: "water", brand: "Bisleri", packSize: "1 liter" },
        { skuId: "WAT_BI_500ML", productName: "water", brand: "Bisleri", packSize: "500 ml" },
        { skuId: "WAT_KI_1L", productName: "water", brand: "Kinley", packSize: "1 liter" },
        { skuId: "WAT_AQ_1L", productName: "water", brand: "Aquafina", packSize: "1 liter" },
        { skuId: "SODA_KI_750ML", productName: "soda", brand: "Kinley", packSize: "750 ml" },
        { skuId: "SODA_BI_750ML", productName: "soda", brand: "Bisleri", packSize: "750 ml" },

        // Vegetables (Brand: Fresh)
        { skuId: "VEG_POTATO_1KG", productName: "potato", brand: "Fresh", packSize: "1 kg" },
        { skuId: "VEG_ONION_1KG", productName: "onion", brand: "Fresh", packSize: "1 kg" },
        { skuId: "VEG_TOMATO_1KG", productName: "tomato", brand: "Fresh", packSize: "1 kg" },
        { skuId: "VEG_CUCUMBER_500G", productName: "cucumber", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_CARROT_500G", productName: "carrot", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_CAPSICUM_500G", productName: "capsicum", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_LADYFINGER_500G", productName: "ladyfinger", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_CAULIFLOWER_1PC", productName: "cauliflower", brand: "Fresh", packSize: "1 pc" },
        { skuId: "VEG_CABBAGE_1PC", productName: "cabbage", brand: "Fresh", packSize: "1 pc" },
        { skuId: "VEG_SPINACH_1PC", productName: "spinach", brand: "Fresh", packSize: "1 bunch" },
        { skuId: "VEG_CORIANDER_1PC", productName: "coriander", brand: "Fresh", packSize: "1 bunch" },
        { skuId: "VEG_GINGER_100G", productName: "ginger", brand: "Fresh", packSize: "100 g" },
        { skuId: "VEG_GARLIC_100G", productName: "garlic", brand: "Fresh", packSize: "100 g" },
        { skuId: "VEG_CHILLI_100G", productName: "green chilli", brand: "Fresh", packSize: "100 g" },
        { skuId: "VEG_LEMON_3PC", productName: "lemon", brand: "Fresh", packSize: "3 pcs" },
        { skuId: "VEG_BRINJAL_500G", productName: "brinjal", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_BOTTLE_GOURD_1PC", productName: "bottle gourd", brand: "Fresh", packSize: "1 pc" },
        { skuId: "VEG_BITTER_GOURD_500G", productName: "bitter gourd", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_PEAS_500G", productName: "green peas", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_BEANS_500G", productName: "french beans", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_BEETROOT_500G", productName: "beetroot", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_RADISH_500G", productName: "radish", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_SWEET_POTATO_500G", productName: "sweet potato", brand: "Fresh", packSize: "500 g" },
        { skuId: "VEG_PUMPKIN_1KG", productName: "pumpkin", brand: "Fresh", packSize: "1 kg" },
        { skuId: "VEG_BROCCOLI_1PC", productName: "broccoli", brand: "Fresh", packSize: "1 pc" },
        { skuId: "VEG_MUSHROOM_200G", productName: "mushroom", brand: "Fresh", packSize: "200 g" },
        { skuId: "VEG_SWEET_CORN_2PC", productName: "sweet corn", brand: "Fresh", packSize: "2 pcs" },
        { skuId: "VEG_MINT_1PC", productName: "mint leaves", brand: "Fresh", packSize: "1 bunch" },
        { skuId: "VEG_CURRY_LEAVES_1PC", productName: "curry leaves", brand: "Fresh", packSize: "1 bunch" },

        // Fruits (Brand: Fresh)
        { skuId: "FRUIT_APPLE_1KG", productName: "apple", brand: "Fresh", packSize: "1 kg" },
        { skuId: "FRUIT_BANANA_6PC", productName: "banana", brand: "Fresh", packSize: "6 pcs" },
        { skuId: "FRUIT_ORANGE_1KG", productName: "orange", brand: "Fresh", packSize: "1 kg" },
        { skuId: "FRUIT_MANGO_1KG", productName: "mango", brand: "Fresh", packSize: "1 kg" },
        { skuId: "FRUIT_GRAPES_500G", productName: "grapes", brand: "Fresh", packSize: "500 g" },
        { skuId: "FRUIT_PAPAYA_1PC", productName: "papaya", brand: "Fresh", packSize: "1 pc" },
        { skuId: "FRUIT_POMEGRANATE_1KG", productName: "pomegranate", brand: "Fresh", packSize: "1 kg" },
        { skuId: "FRUIT_WATERMELON_1PC", productName: "watermelon", brand: "Fresh", packSize: "1 pc" },
        { skuId: "FRUIT_PINEAPPLE_1PC", productName: "pineapple", brand: "Fresh", packSize: "1 pc" },
        { skuId: "FRUIT_GUAVA_1KG", productName: "guava", brand: "Fresh", packSize: "1 kg" },
        { skuId: "FRUIT_KIWI_3PC", productName: "kiwi", brand: "Fresh", packSize: "3 pcs" },
        { skuId: "FRUIT_STRAWBERRY_200G", productName: "strawberry", brand: "Fresh", packSize: "200 g" },
        { skuId: "FRUIT_PEAR_1KG", productName: "pear", brand: "Fresh", packSize: "1 kg" },
        { skuId: "FRUIT_MUSKMELON_1PC", productName: "muskmelon", brand: "Fresh", packSize: "1 pc" },
        { skuId: "FRUIT_COCONUT_1PC", productName: "coconut", brand: "Fresh", packSize: "1 pc" },
        { skuId: "FRUIT_AVOCADO_1PC", productName: "avocado", brand: "Fresh", packSize: "1 pc" },
        { skuId: "FRUIT_DRAGON_1PC", productName: "dragon fruit", brand: "Fresh", packSize: "1 pc" },
        { skuId: "FRUIT_CUSTARD_APPLE_1KG", productName: "custard apple", brand: "Fresh", packSize: "1 kg" }
    ],
};

// Helper to extract unit
const extractUnit = (packSize: string): string => {
    if (packSize.includes('kg')) return 'kg';
    if (packSize.includes('g')) return 'g';
    if (packSize.includes('liter')) return 'l';
    if (packSize.includes('ml')) return 'ml';
    if (packSize.includes('pc')) return 'pc';
    if (packSize.includes('pack')) return 'pack';
    return 'unit';
};

// Helper to generate a consistent mock price
const generatePrice = (sku: string): number => {
    let hash = 0;
    for (let i = 0; i < sku.length; i++) {
        hash = sku.charCodeAt(i) + ((hash << 5) - hash);
    }
    const price = 20 + (Math.abs(hash) % 481);
    return Math.ceil(price / 5) * 5;
};

// Helper to determine category
const deriveCategory = (name: string): string => {
    const n = name.toLowerCase();
    if (['rice', 'atta', 'dal', 'oil', 'sugar', 'salt', 'besan', 'maida', 'suji', 'poha'].some(k => n.includes(k))) return 'Staples';
    if (['milk', 'curd', 'paneer', 'butter', 'cream', 'ghee'].some(k => n.includes(k))) return 'Dairy';
    if (['biscuit', 'chocolate', 'snack', 'chips', 'namkeen', 'noodle', 'popcorn', 'jam', 'ketchup', 'honey', 'cornflakes', 'oats', 'pasta', 'vermicelli', 'ready to eat', 'pickle', 'papad', 'soya', 'peanut'].some(k => n.includes(k))) return 'Snacks & Instant';
    if (['soap', 'shampoo', 'paste', 'wash', 'cream', 'deo', 'shave', 'hair oil', 'talc', 'sanitizer', 'diaper', 'face wash'].some(k => n.includes(k))) return 'Personal Care';
    if (['clean', 'detergent', 'dish', 'repellent', 'tissue', 'bag', 'foil', 'toilet', 'bulb', 'battery', 'glue', 'pen', 'notebook', 'shoe', 'air freshener'].some(k => n.includes(k))) return 'Household';
    if (['juice', 'drink', 'soda', 'coke', 'pepsi', 'sprite', 'thums', 'maaza', 'slice', 'energy', 'bournvita', 'horlicks', 'complan', 'water'].some(k => n.includes(k))) return 'Beverages';
    if (['almonds', 'cashew', 'raisin'].some(k => n.includes(k))) return 'Dry Fruits';
    if (['vegetable', 'potato', 'onion', 'tomato', 'fresh', 'cucumber', 'carrot', 'capsicum', 'ladyfinger', 'cauliflower', 'cabbage', 'spinach', 'coriander', 'ginger', 'garlic', 'chilli', 'lemon', 'brinjal', 'gourd', 'peas', 'beans', 'beetroot', 'radish', 'sweet potato', 'pumpkin', 'broccoli', 'mushroom', 'corn', 'mint', 'curry'].some(k => RAW_INVENTORY.products.find(p => p.productName === n)?.brand === 'Fresh')) return 'Fresh Produce';
    if (['fruit', 'apple', 'banana', 'orange', 'mango', 'grape', 'papaya', 'pomegranate', 'melon', 'pineapple', 'guava', 'kiwi', 'berry', 'pear', 'coconut', 'avocado', 'dragon', 'custard'].some(k => RAW_INVENTORY.products.find(p => p.productName === n)?.brand === 'Fresh')) return 'Fresh Produce';

    return 'General';
};

export const INITIAL_INVENTORY: InventoryItem[] = RAW_INVENTORY.products.map(p => ({
    id: p.skuId,
    name: p.productName.charAt(0).toUpperCase() + p.productName.slice(1),
    brand: p.brand,
    packSize: p.packSize,
    category: deriveCategory(p.productName),
    unit: extractUnit(p.packSize),
    quantityValue: parseFloat(p.packSize) || 1,
    price: generatePrice(p.skuId)
}));

export const CATEGORIES = [
    'Staples', 'Dairy', 'Snacks & Instant', 'Personal Care', 'Household',
    'Beverages', 'Dry Fruits', 'Fresh Produce', 'General'
];

export const INITIAL_GREETING: Message = {
    id: 'init-1',
    role: 'model',
    text: "Hi! I can help you order groceries. What do you need today?",
    timestamp: Date.now(),
};

// Dynamic System Instruction Generator
export const generateSystemInstruction = (inventory: InventoryItem[]) => `
You are an intelligent Grocery Shop Assistant.
Your goal is to help users build a shopping cart from the provided inventory.

**Inventory (Source of Truth):**
${JSON.stringify(inventory.map(i => `${i.name} (${i.brand}) - ${i.packSize}`))}

**Behavior Rules:**
1.  **Strict Inventory Check:** You can ONLY sell items listed in the inventory. If an item isn't there, politely apologize.
2.  **Sequential Processing (One Question at a Time):**
    *   If the user asks for multiple items (e.g., "Rice, Milk, Soap"), process them **one by one**.
    *   Resolve the first item completely (clarify brand/size -> Add to Cart) BEFORE asking about the next item.
    *   Do NOT list questions for all items at once.
3.  **Ambiguity & Smart Matching:**
    *   **Brand:** If multiple brands exist (e.g. Rice), Ask: "Which brand? We have India Gate, Daawat, etc."
        *   *Exception:* For "Fresh" produce (Vegetables/Fruits), **AUTO-SELECT** the "Fresh" brand. Do not ask for brand.
    *   **Pack Size:** If multiple sizes exist, Ask: "Which pack size?"
    *   **Smart Match:** If user wants "5kg India Gate Rice", AUTO-SELECT it. Do not ask.
    *   **Quantity Math:** If user wants "5 Liters Milk" and you only have "1L" packs:
        *   Calculate: "5 packs of 1L = 5 Liters." -> Call \`addToCart\` with quantity=5.
        *   Verify the brand first, then do the math silently or confirm "Adding 5 packs of 1L to make 5 Liters".
4.  **Cart Management:**
    *   Use \`addToCart\` when details (Brand + Pack Size) are finalized.
    *   Use \`removeFromCart\` to delete items.
    *   Use \`updateCart\` logic by removing and adding or just confirming the new state.
    *   Maintain a "Pending List" in memory for multi-item requests so you don't forget the second item while discussing the first.
5.  **Tone & Formatting:**
    *   Friendly, short, conversational.
    *   **Do NOT use checkmarks (✓).**
    *   Use **bold text** for item names and quantities (e.g. **5 kg Rice**).
    *   When adding to cart, confirm clearly: "Added **Item Name** to cart."
6.  **RECOMMENDATION & CONFIRMATION POLICY:**
    *   **Batch Recommendations:** Do **NOT** ask for recommendations immediately after adding an item if there are more items from the user's request to process. Wait until the **entire batch** is processed.
    *   **Timing:** Suggest recommendations only when:
        *   You have finished adding all items from the current user message.
        *   The user is initiating checkout.
    *   **Quantity Display:** When confirming an addition, if the user requested a total quantity (e.g. "2kg") that was fulfilled by multiple packs (e.g. "4x 500g"), you **MUST** format the confirmation as: "Added **[Total Quantity]** [Item Name] (**[Breakdown]**) to cart."
        *   *Example:* "Added **2 kg** Toor Dal (**4x 500g packs**) to cart."
        *   *Example:* "Added **2 liters** Amul Ghee (**2x 1 liter packs**) to cart."
    *   **Upsell Logic:**
        *   Suggest ONE complementary product based on the *entire* recent addition.
        *   **CRITICAL:** **NEVER** suggest a product that is **already in the cart** or was **part of the current user request**.
        *   *Mappings:*
            *   Staples (Rice/Atta/Dal) -> Suggest Ghee, Spices, or Pickle.
            *   Bread -> Suggest Butter or Jam.
            *   Milk -> Suggest Cornflakes, Coffee, or Tea.
            *   Detergent -> Suggest Floor Cleaner or Dishwash.
            *   Vegetables -> Suggest Fruits.
    *   **Checkout Suggestions:** When the user asks to checkout, briefly suggest *one* highly relevant missing category **BEFORE** calling \`triggerCheckout\`.
        *   *Example:* "Before I open the checkout, do you need any **Spices** or **Oil**?"
        *   **Wait** for the user's "No" before actually calling \`triggerCheckout\`.
7.  **Voice Checkout Flow (Strict for Voice Mode):**
    *   **CRITICAL: You do not know the user's cart state initially. They might have added items before talking to you.**
    *   If user says "Checkout", "Place Order", or "Done":
        1.  **STEP 1:** Call \`getCartDetails()\` to fetch current items. **DO NOT assume cart is empty.**
        2.  **STEP 2:** Read the item summary and total. Ask: "Your total is [Amount]. Shall I confirm the order?"
        3.  **STEP 3:** If they say "Yes", Ask: "Please share your delivery address."
        4.  **STEP 4:** After getting address, Call \`placeOrder(address)\`.
        5.  **STEP 5:** Say: "Order placed! Delivery in a few hours. Cash on Delivery. Thanks!" and stop talking.

**Tools:**
- addToCart(productName, brand, packSize, quantity)
- removeFromCart(productName)
- clearCart()
- showCart()
- triggerCheckout() (For UI modal)
- getCartDetails() (For Voice to read cart)
- placeOrder(address) (For Voice to finalize)
`;
