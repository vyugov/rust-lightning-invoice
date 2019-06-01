var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013, 2014 Pieter Wuille                             *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef SECP256K1_ECKEY_IMPL_H"},
{"lineNum":"    8","line":"#define SECP256K1_ECKEY_IMPL_H"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include \"eckey.h\""},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"#include \"scalar.h\""},
{"lineNum":"   13","line":"#include \"field.h\""},
{"lineNum":"   14","line":"#include \"group.h\""},
{"lineNum":"   15","line":"#include \"ecmult_gen.h\""},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"static int secp256k1_eckey_pubkey_parse(secp256k1_ge *elem, const unsigned char *pub, size_t size) {","class":"lineCov","hits":"1","order":"2356","possible_hits":"1",},
{"lineNum":"   18","line":"    if (size == 33 && (pub[0] == SECP256K1_TAG_PUBKEY_EVEN || pub[0] == SECP256K1_TAG_PUBKEY_ODD)) {","class":"lineCov","hits":"1","order":"2357","possible_hits":"1",},
{"lineNum":"   19","line":"        secp256k1_fe x;"},
{"lineNum":"   20","line":"        return secp256k1_fe_set_b32(&x, pub+1) && secp256k1_ge_set_xo_var(elem, &x, pub[0] == SECP256K1_TAG_PUBKEY_ODD);","class":"lineCov","hits":"1","order":"2358","possible_hits":"1",},
{"lineNum":"   21","line":"    } else if (size == 65 && (pub[0] == 0x04 || pub[0] == 0x06 || pub[0] == 0x07)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":"        secp256k1_fe x, y;"},
{"lineNum":"   23","line":"        if (!secp256k1_fe_set_b32(&x, pub+1) || !secp256k1_fe_set_b32(&y, pub+33)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"            return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"        }"},
{"lineNum":"   26","line":"        secp256k1_ge_set_xy(elem, &x, &y);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":"        if ((pub[0] == SECP256K1_TAG_PUBKEY_HYBRID_EVEN || pub[0] == SECP256K1_TAG_PUBKEY_HYBRID_ODD) &&","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   28","line":"            secp256k1_fe_is_odd(&y) != (pub[0] == SECP256K1_TAG_PUBKEY_HYBRID_ODD)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"            return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"        }"},
{"lineNum":"   31","line":"        return secp256k1_ge_is_valid_var(elem);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"    } else {"},
{"lineNum":"   33","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"    }"},
{"lineNum":"   35","line":"}","class":"linePartCov","hits":"1","order":"2610","possible_hits":"2",},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"static int secp256k1_eckey_pubkey_serialize(secp256k1_ge *elem, unsigned char *pub, size_t *size, int compressed) {","class":"lineCov","hits":"1","order":"5109","possible_hits":"1",},
{"lineNum":"   38","line":"    if (secp256k1_ge_is_infinity(elem)) {","class":"lineCov","hits":"1","order":"5110","possible_hits":"1",},
{"lineNum":"   39","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    }"},
{"lineNum":"   41","line":"    secp256k1_fe_normalize_var(&elem->x);","class":"lineCov","hits":"1","order":"5114","possible_hits":"1",},
{"lineNum":"   42","line":"    secp256k1_fe_normalize_var(&elem->y);","class":"lineCov","hits":"1","order":"5115","possible_hits":"1",},
{"lineNum":"   43","line":"    secp256k1_fe_get_b32(&pub[1], &elem->x);","class":"lineCov","hits":"1","order":"5116","possible_hits":"1",},
{"lineNum":"   44","line":"    if (compressed) {","class":"lineCov","hits":"1","order":"5151","possible_hits":"1",},
{"lineNum":"   45","line":"        *size = 33;","class":"lineCov","hits":"1","order":"5152","possible_hits":"1",},
{"lineNum":"   46","line":"        pub[0] = secp256k1_fe_is_odd(&elem->y) ? SECP256K1_TAG_PUBKEY_ODD : SECP256K1_TAG_PUBKEY_EVEN;","class":"lineCov","hits":"1","order":"5153","possible_hits":"1",},
{"lineNum":"   47","line":"    } else {"},
{"lineNum":"   48","line":"        *size = 65;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"        pub[0] = SECP256K1_TAG_PUBKEY_UNCOMPRESSED;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"        secp256k1_fe_get_b32(&pub[33], &elem->y);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":"    return 1;","class":"lineCov","hits":"1","order":"5154","possible_hits":"1",},
{"lineNum":"   53","line":"}","class":"linePartCov","hits":"1","order":"5155","possible_hits":"2",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"static int secp256k1_eckey_privkey_tweak_add(secp256k1_scalar *key, const secp256k1_scalar *tweak) {"},
{"lineNum":"   56","line":"    secp256k1_scalar_add(key, key, tweak);"},
{"lineNum":"   57","line":"    if (secp256k1_scalar_is_zero(key)) {"},
{"lineNum":"   58","line":"        return 0;"},
{"lineNum":"   59","line":"    }"},
{"lineNum":"   60","line":"    return 1;"},
{"lineNum":"   61","line":"}"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"static int secp256k1_eckey_pubkey_tweak_add(const secp256k1_ecmult_context *ctx, secp256k1_ge *key, const secp256k1_scalar *tweak) {"},
{"lineNum":"   64","line":"    secp256k1_gej pt;"},
{"lineNum":"   65","line":"    secp256k1_scalar one;"},
{"lineNum":"   66","line":"    secp256k1_gej_set_ge(&pt, key);"},
{"lineNum":"   67","line":"    secp256k1_scalar_set_int(&one, 1);"},
{"lineNum":"   68","line":"    secp256k1_ecmult(ctx, &pt, &pt, &one, tweak);"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    if (secp256k1_gej_is_infinity(&pt)) {"},
{"lineNum":"   71","line":"        return 0;"},
{"lineNum":"   72","line":"    }"},
{"lineNum":"   73","line":"    secp256k1_ge_set_gej(key, &pt);"},
{"lineNum":"   74","line":"    return 1;"},
{"lineNum":"   75","line":"}"},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"static int secp256k1_eckey_privkey_tweak_mul(secp256k1_scalar *key, const secp256k1_scalar *tweak) {"},
{"lineNum":"   78","line":"    if (secp256k1_scalar_is_zero(tweak)) {"},
{"lineNum":"   79","line":"        return 0;"},
{"lineNum":"   80","line":"    }"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"    secp256k1_scalar_mul(key, key, tweak);"},
{"lineNum":"   83","line":"    return 1;"},
{"lineNum":"   84","line":"}"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"static int secp256k1_eckey_pubkey_tweak_mul(const secp256k1_ecmult_context *ctx, secp256k1_ge *key, const secp256k1_scalar *tweak) {"},
{"lineNum":"   87","line":"    secp256k1_scalar zero;"},
{"lineNum":"   88","line":"    secp256k1_gej pt;"},
{"lineNum":"   89","line":"    if (secp256k1_scalar_is_zero(tweak)) {"},
{"lineNum":"   90","line":"        return 0;"},
{"lineNum":"   91","line":"    }"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    secp256k1_scalar_set_int(&zero, 0);"},
{"lineNum":"   94","line":"    secp256k1_gej_set_ge(&pt, key);"},
{"lineNum":"   95","line":"    secp256k1_ecmult(ctx, &pt, &pt, tweak, &zero);"},
{"lineNum":"   96","line":"    secp256k1_ge_set_gej(key, &pt);"},
{"lineNum":"   97","line":"    return 1;"},
{"lineNum":"   98","line":"}"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"#endif /* SECP256K1_ECKEY_IMPL_H */"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "lightning_invoice-19f07d0577b73f6d", "date" : "2019-06-01 07:50:27", "instrumented" : 27, "covered" : 14,};
var merged_data = [];
