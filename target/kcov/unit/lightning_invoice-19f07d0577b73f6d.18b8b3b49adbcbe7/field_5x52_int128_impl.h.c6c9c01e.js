var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013, 2014 Pieter Wuille                             *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef SECP256K1_FIELD_INNER5X52_IMPL_H"},
{"lineNum":"    8","line":"#define SECP256K1_FIELD_INNER5X52_IMPL_H"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include <stdint.h>"},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"#ifdef VERIFY"},
{"lineNum":"   13","line":"#define VERIFY_BITS(x, n) VERIFY_CHECK(((x) >> (n)) == 0)"},
{"lineNum":"   14","line":"#else"},
{"lineNum":"   15","line":"#define VERIFY_BITS(x, n) do { } while(0)"},
{"lineNum":"   16","line":"#endif"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"SECP256K1_INLINE static void secp256k1_fe_mul_inner(uint64_t *r, const uint64_t *a, const uint64_t * SECP256K1_RESTRICT b) {","class":"lineCov","hits":"1","order":"2446","possible_hits":"1",},
{"lineNum":"   19","line":"    uint128_t c, d;"},
{"lineNum":"   20","line":"    uint64_t t3, t4, tx, u0;"},
{"lineNum":"   21","line":"    uint64_t a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4];","class":"lineCov","hits":"1","order":"2447","possible_hits":"1",},
{"lineNum":"   22","line":"    const uint64_t M = 0xFFFFFFFFFFFFFULL, R = 0x1000003D10ULL;","class":"lineCov","hits":"1","order":"2448","possible_hits":"1",},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"    VERIFY_BITS(a[0], 56);"},
{"lineNum":"   25","line":"    VERIFY_BITS(a[1], 56);"},
{"lineNum":"   26","line":"    VERIFY_BITS(a[2], 56);"},
{"lineNum":"   27","line":"    VERIFY_BITS(a[3], 56);"},
{"lineNum":"   28","line":"    VERIFY_BITS(a[4], 52);"},
{"lineNum":"   29","line":"    VERIFY_BITS(b[0], 56);"},
{"lineNum":"   30","line":"    VERIFY_BITS(b[1], 56);"},
{"lineNum":"   31","line":"    VERIFY_BITS(b[2], 56);"},
{"lineNum":"   32","line":"    VERIFY_BITS(b[3], 56);"},
{"lineNum":"   33","line":"    VERIFY_BITS(b[4], 52);"},
{"lineNum":"   34","line":"    VERIFY_CHECK(r != b);"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    /*  [... a b c] is a shorthand for ... + a<<104 + b<<52 + c<<0 mod n."},
{"lineNum":"   37","line":"     *  px is a shorthand for sum(a[i]*b[x-i], i=0..x)."},
{"lineNum":"   38","line":"     *  Note that [x 0 0 0 0 0] = [x*R]."},
{"lineNum":"   39","line":"     */"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    d  = (uint128_t)a0 * b[3]","class":"lineCov","hits":"2","order":"2449","possible_hits":"2",},
{"lineNum":"   42","line":"       + (uint128_t)a1 * b[2]","class":"lineCov","hits":"1","order":"2450","possible_hits":"1",},
{"lineNum":"   43","line":"       + (uint128_t)a2 * b[1]","class":"lineCov","hits":"1","order":"2452","possible_hits":"1",},
{"lineNum":"   44","line":"       + (uint128_t)a3 * b[0];","class":"lineCov","hits":"2","order":"2451","possible_hits":"2",},
{"lineNum":"   45","line":"    VERIFY_BITS(d, 114);"},
{"lineNum":"   46","line":"    /* [d 0 0 0] = [p3 0 0 0] */"},
{"lineNum":"   47","line":"    c  = (uint128_t)a4 * b[4];","class":"lineCov","hits":"1","order":"2453","possible_hits":"1",},
{"lineNum":"   48","line":"    VERIFY_BITS(c, 112);"},
{"lineNum":"   49","line":"    /* [c 0 0 0 0 d 0 0 0] = [p8 0 0 0 0 p3 0 0 0] */"},
{"lineNum":"   50","line":"    d += (c & M) * R; c >>= 52;","class":"lineCov","hits":"1","order":"2454","possible_hits":"1",},
{"lineNum":"   51","line":"    VERIFY_BITS(d, 115);"},
{"lineNum":"   52","line":"    VERIFY_BITS(c, 60);"},
{"lineNum":"   53","line":"    /* [c 0 0 0 0 0 d 0 0 0] = [p8 0 0 0 0 p3 0 0 0] */"},
{"lineNum":"   54","line":"    t3 = d & M; d >>= 52;","class":"lineCov","hits":"1","order":"2455","possible_hits":"1",},
{"lineNum":"   55","line":"    VERIFY_BITS(t3, 52);"},
{"lineNum":"   56","line":"    VERIFY_BITS(d, 63);"},
{"lineNum":"   57","line":"    /* [c 0 0 0 0 d t3 0 0 0] = [p8 0 0 0 0 p3 0 0 0] */"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    d += (uint128_t)a0 * b[4]","class":"lineCov","hits":"2","order":"2456","possible_hits":"2",},
{"lineNum":"   60","line":"       + (uint128_t)a1 * b[3]","class":"lineCov","hits":"1","order":"2457","possible_hits":"1",},
{"lineNum":"   61","line":"       + (uint128_t)a2 * b[2]","class":"lineCov","hits":"1","order":"2459","possible_hits":"1",},
{"lineNum":"   62","line":"       + (uint128_t)a3 * b[1]","class":"lineCov","hits":"2","order":"2458","possible_hits":"2",},
{"lineNum":"   63","line":"       + (uint128_t)a4 * b[0];","class":"lineCov","hits":"1","order":"2460","possible_hits":"1",},
{"lineNum":"   64","line":"    VERIFY_BITS(d, 115);"},
{"lineNum":"   65","line":"    /* [c 0 0 0 0 d t3 0 0 0] = [p8 0 0 0 p4 p3 0 0 0] */"},
{"lineNum":"   66","line":"    d += c * R;","class":"lineCov","hits":"1","order":"2461","possible_hits":"1",},
{"lineNum":"   67","line":"    VERIFY_BITS(d, 116);"},
{"lineNum":"   68","line":"    /* [d t3 0 0 0] = [p8 0 0 0 p4 p3 0 0 0] */"},
{"lineNum":"   69","line":"    t4 = d & M; d >>= 52;","class":"lineCov","hits":"1","order":"2462","possible_hits":"1",},
{"lineNum":"   70","line":"    VERIFY_BITS(t4, 52);"},
{"lineNum":"   71","line":"    VERIFY_BITS(d, 64);"},
{"lineNum":"   72","line":"    /* [d t4 t3 0 0 0] = [p8 0 0 0 p4 p3 0 0 0] */"},
{"lineNum":"   73","line":"    tx = (t4 >> 48); t4 &= (M >> 4);","class":"lineCov","hits":"1","order":"2463","possible_hits":"1",},
{"lineNum":"   74","line":"    VERIFY_BITS(tx, 4);"},
{"lineNum":"   75","line":"    VERIFY_BITS(t4, 48);"},
{"lineNum":"   76","line":"    /* [d t4+(tx<<48) t3 0 0 0] = [p8 0 0 0 p4 p3 0 0 0] */"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    c  = (uint128_t)a0 * b[0];","class":"lineCov","hits":"1","order":"2464","possible_hits":"1",},
{"lineNum":"   79","line":"    VERIFY_BITS(c, 112);"},
{"lineNum":"   80","line":"    /* [d t4+(tx<<48) t3 0 0 c] = [p8 0 0 0 p4 p3 0 0 p0] */"},
{"lineNum":"   81","line":"    d += (uint128_t)a1 * b[4]","class":"lineCov","hits":"2","order":"2465","possible_hits":"2",},
{"lineNum":"   82","line":"       + (uint128_t)a2 * b[3]","class":"lineCov","hits":"1","order":"2466","possible_hits":"1",},
{"lineNum":"   83","line":"       + (uint128_t)a3 * b[2]","class":"lineCov","hits":"1","order":"2468","possible_hits":"1",},
{"lineNum":"   84","line":"       + (uint128_t)a4 * b[1];","class":"lineCov","hits":"2","order":"2467","possible_hits":"2",},
{"lineNum":"   85","line":"    VERIFY_BITS(d, 115);"},
{"lineNum":"   86","line":"    /* [d t4+(tx<<48) t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"   87","line":"    u0 = d & M; d >>= 52;","class":"lineCov","hits":"1","order":"2469","possible_hits":"1",},
{"lineNum":"   88","line":"    VERIFY_BITS(u0, 52);"},
{"lineNum":"   89","line":"    VERIFY_BITS(d, 63);"},
{"lineNum":"   90","line":"    /* [d u0 t4+(tx<<48) t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"   91","line":"    /* [d 0 t4+(tx<<48)+(u0<<52) t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"   92","line":"    u0 = (u0 << 4) | tx;","class":"lineCov","hits":"1","order":"2470","possible_hits":"1",},
{"lineNum":"   93","line":"    VERIFY_BITS(u0, 56);"},
{"lineNum":"   94","line":"    /* [d 0 t4+(u0<<48) t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"   95","line":"    c += (uint128_t)u0 * (R >> 4);","class":"lineCov","hits":"1","order":"2471","possible_hits":"1",},
{"lineNum":"   96","line":"    VERIFY_BITS(c, 115);"},
{"lineNum":"   97","line":"    /* [d 0 t4 t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"   98","line":"    r[0] = c & M; c >>= 52;","class":"lineCov","hits":"1","order":"2472","possible_hits":"1",},
{"lineNum":"   99","line":"    VERIFY_BITS(r[0], 52);"},
{"lineNum":"  100","line":"    VERIFY_BITS(c, 61);"},
{"lineNum":"  101","line":"    /* [d 0 t4 t3 0 c r0] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"  102","line":""},
{"lineNum":"  103","line":"    c += (uint128_t)a0 * b[1]","class":"lineCov","hits":"2","order":"2473","possible_hits":"2",},
{"lineNum":"  104","line":"       + (uint128_t)a1 * b[0];","class":"lineCov","hits":"1","order":"2474","possible_hits":"1",},
{"lineNum":"  105","line":"    VERIFY_BITS(c, 114);"},
{"lineNum":"  106","line":"    /* [d 0 t4 t3 0 c r0] = [p8 0 0 p5 p4 p3 0 p1 p0] */"},
{"lineNum":"  107","line":"    d += (uint128_t)a2 * b[4]","class":"lineCov","hits":"2","order":"2475","possible_hits":"2",},
{"lineNum":"  108","line":"       + (uint128_t)a3 * b[3]","class":"lineCov","hits":"1","order":"2476","possible_hits":"1",},
{"lineNum":"  109","line":"       + (uint128_t)a4 * b[2];","class":"lineCov","hits":"1","order":"2477","possible_hits":"1",},
{"lineNum":"  110","line":"    VERIFY_BITS(d, 114);"},
{"lineNum":"  111","line":"    /* [d 0 t4 t3 0 c r0] = [p8 0 p6 p5 p4 p3 0 p1 p0] */"},
{"lineNum":"  112","line":"    c += (d & M) * R; d >>= 52;","class":"lineCov","hits":"1","order":"2478","possible_hits":"1",},
{"lineNum":"  113","line":"    VERIFY_BITS(c, 115);"},
{"lineNum":"  114","line":"    VERIFY_BITS(d, 62);"},
{"lineNum":"  115","line":"    /* [d 0 0 t4 t3 0 c r0] = [p8 0 p6 p5 p4 p3 0 p1 p0] */"},
{"lineNum":"  116","line":"    r[1] = c & M; c >>= 52;","class":"lineCov","hits":"1","order":"2479","possible_hits":"1",},
{"lineNum":"  117","line":"    VERIFY_BITS(r[1], 52);"},
{"lineNum":"  118","line":"    VERIFY_BITS(c, 63);"},
{"lineNum":"  119","line":"    /* [d 0 0 t4 t3 c r1 r0] = [p8 0 p6 p5 p4 p3 0 p1 p0] */"},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"    c += (uint128_t)a0 * b[2]","class":"lineCov","hits":"2","order":"2480","possible_hits":"2",},
{"lineNum":"  122","line":"       + (uint128_t)a1 * b[1]","class":"lineCov","hits":"1","order":"2481","possible_hits":"1",},
{"lineNum":"  123","line":"       + (uint128_t)a2 * b[0];","class":"lineCov","hits":"1","order":"2482","possible_hits":"1",},
{"lineNum":"  124","line":"    VERIFY_BITS(c, 114);"},
{"lineNum":"  125","line":"    /* [d 0 0 t4 t3 c r1 r0] = [p8 0 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  126","line":"    d += (uint128_t)a3 * b[4]","class":"lineCov","hits":"2","order":"2483","possible_hits":"2",},
{"lineNum":"  127","line":"       + (uint128_t)a4 * b[3];","class":"lineCov","hits":"1","order":"2484","possible_hits":"1",},
{"lineNum":"  128","line":"    VERIFY_BITS(d, 114);"},
{"lineNum":"  129","line":"    /* [d 0 0 t4 t3 c t1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  130","line":"    c += (d & M) * R; d >>= 52;","class":"lineCov","hits":"1","order":"2485","possible_hits":"1",},
{"lineNum":"  131","line":"    VERIFY_BITS(c, 115);"},
{"lineNum":"  132","line":"    VERIFY_BITS(d, 62);"},
{"lineNum":"  133","line":"    /* [d 0 0 0 t4 t3 c r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"    /* [d 0 0 0 t4 t3 c r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  136","line":"    r[2] = c & M; c >>= 52;","class":"lineCov","hits":"1","order":"2486","possible_hits":"1",},
{"lineNum":"  137","line":"    VERIFY_BITS(r[2], 52);"},
{"lineNum":"  138","line":"    VERIFY_BITS(c, 63);"},
{"lineNum":"  139","line":"    /* [d 0 0 0 t4 t3+c r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  140","line":"    c   += d * R + t3;","class":"lineCov","hits":"1","order":"2487","possible_hits":"1",},
{"lineNum":"  141","line":"    VERIFY_BITS(c, 100);"},
{"lineNum":"  142","line":"    /* [t4 c r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  143","line":"    r[3] = c & M; c >>= 52;","class":"lineCov","hits":"1","order":"2488","possible_hits":"1",},
{"lineNum":"  144","line":"    VERIFY_BITS(r[3], 52);"},
{"lineNum":"  145","line":"    VERIFY_BITS(c, 48);"},
{"lineNum":"  146","line":"    /* [t4+c r3 r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  147","line":"    c   += t4;","class":"lineCov","hits":"1","order":"2489","possible_hits":"1",},
{"lineNum":"  148","line":"    VERIFY_BITS(c, 49);"},
{"lineNum":"  149","line":"    /* [c r3 r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  150","line":"    r[4] = c;","class":"lineCov","hits":"1","order":"2490","possible_hits":"1",},
{"lineNum":"  151","line":"    VERIFY_BITS(r[4], 49);"},
{"lineNum":"  152","line":"    /* [r4 r3 r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  153","line":"}","class":"linePartCov","hits":"1","order":"2491","possible_hits":"2",},
{"lineNum":"  154","line":""},
{"lineNum":"  155","line":"SECP256K1_INLINE static void secp256k1_fe_sqr_inner(uint64_t *r, const uint64_t *a) {","class":"lineCov","hits":"1","order":"2404","possible_hits":"1",},
{"lineNum":"  156","line":"    uint128_t c, d;"},
{"lineNum":"  157","line":"    uint64_t a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4];","class":"lineCov","hits":"1","order":"2405","possible_hits":"1",},
{"lineNum":"  158","line":"    int64_t t3, t4, tx, u0;"},
{"lineNum":"  159","line":"    const uint64_t M = 0xFFFFFFFFFFFFFULL, R = 0x1000003D10ULL;","class":"lineCov","hits":"1","order":"2406","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    VERIFY_BITS(a[0], 56);"},
{"lineNum":"  162","line":"    VERIFY_BITS(a[1], 56);"},
{"lineNum":"  163","line":"    VERIFY_BITS(a[2], 56);"},
{"lineNum":"  164","line":"    VERIFY_BITS(a[3], 56);"},
{"lineNum":"  165","line":"    VERIFY_BITS(a[4], 52);"},
{"lineNum":"  166","line":""},
{"lineNum":"  167","line":"    /**  [... a b c] is a shorthand for ... + a<<104 + b<<52 + c<<0 mod n."},
{"lineNum":"  168","line":"     *  px is a shorthand for sum(a[i]*a[x-i], i=0..x)."},
{"lineNum":"  169","line":"     *  Note that [x 0 0 0 0 0] = [x*R]."},
{"lineNum":"  170","line":"     */"},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"    d  = (uint128_t)(a0*2) * a3","class":"lineCov","hits":"2","order":"2407","possible_hits":"2",},
{"lineNum":"  173","line":"       + (uint128_t)(a1*2) * a2;","class":"lineCov","hits":"1","order":"2408","possible_hits":"1",},
{"lineNum":"  174","line":"    VERIFY_BITS(d, 114);"},
{"lineNum":"  175","line":"    /* [d 0 0 0] = [p3 0 0 0] */"},
{"lineNum":"  176","line":"    c  = (uint128_t)a4 * a4;","class":"lineCov","hits":"1","order":"2409","possible_hits":"1",},
{"lineNum":"  177","line":"    VERIFY_BITS(c, 112);"},
{"lineNum":"  178","line":"    /* [c 0 0 0 0 d 0 0 0] = [p8 0 0 0 0 p3 0 0 0] */"},
{"lineNum":"  179","line":"    d += (c & M) * R; c >>= 52;","class":"lineCov","hits":"1","order":"2410","possible_hits":"1",},
{"lineNum":"  180","line":"    VERIFY_BITS(d, 115);"},
{"lineNum":"  181","line":"    VERIFY_BITS(c, 60);"},
{"lineNum":"  182","line":"    /* [c 0 0 0 0 0 d 0 0 0] = [p8 0 0 0 0 p3 0 0 0] */"},
{"lineNum":"  183","line":"    t3 = d & M; d >>= 52;","class":"lineCov","hits":"1","order":"2411","possible_hits":"1",},
{"lineNum":"  184","line":"    VERIFY_BITS(t3, 52);"},
{"lineNum":"  185","line":"    VERIFY_BITS(d, 63);"},
{"lineNum":"  186","line":"    /* [c 0 0 0 0 d t3 0 0 0] = [p8 0 0 0 0 p3 0 0 0] */"},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"    a4 *= 2;","class":"lineCov","hits":"1","order":"2412","possible_hits":"1",},
{"lineNum":"  189","line":"    d += (uint128_t)a0 * a4","class":"lineCov","hits":"2","order":"2413","possible_hits":"2",},
{"lineNum":"  190","line":"       + (uint128_t)(a1*2) * a3","class":"lineCov","hits":"1","order":"2414","possible_hits":"1",},
{"lineNum":"  191","line":"       + (uint128_t)a2 * a2;","class":"lineCov","hits":"1","order":"2415","possible_hits":"1",},
{"lineNum":"  192","line":"    VERIFY_BITS(d, 115);"},
{"lineNum":"  193","line":"    /* [c 0 0 0 0 d t3 0 0 0] = [p8 0 0 0 p4 p3 0 0 0] */"},
{"lineNum":"  194","line":"    d += c * R;","class":"lineCov","hits":"1","order":"2416","possible_hits":"1",},
{"lineNum":"  195","line":"    VERIFY_BITS(d, 116);"},
{"lineNum":"  196","line":"    /* [d t3 0 0 0] = [p8 0 0 0 p4 p3 0 0 0] */"},
{"lineNum":"  197","line":"    t4 = d & M; d >>= 52;","class":"lineCov","hits":"1","order":"2417","possible_hits":"1",},
{"lineNum":"  198","line":"    VERIFY_BITS(t4, 52);"},
{"lineNum":"  199","line":"    VERIFY_BITS(d, 64);"},
{"lineNum":"  200","line":"    /* [d t4 t3 0 0 0] = [p8 0 0 0 p4 p3 0 0 0] */"},
{"lineNum":"  201","line":"    tx = (t4 >> 48); t4 &= (M >> 4);","class":"lineCov","hits":"1","order":"2418","possible_hits":"1",},
{"lineNum":"  202","line":"    VERIFY_BITS(tx, 4);"},
{"lineNum":"  203","line":"    VERIFY_BITS(t4, 48);"},
{"lineNum":"  204","line":"    /* [d t4+(tx<<48) t3 0 0 0] = [p8 0 0 0 p4 p3 0 0 0] */"},
{"lineNum":"  205","line":""},
{"lineNum":"  206","line":"    c  = (uint128_t)a0 * a0;","class":"lineCov","hits":"1","order":"2419","possible_hits":"1",},
{"lineNum":"  207","line":"    VERIFY_BITS(c, 112);"},
{"lineNum":"  208","line":"    /* [d t4+(tx<<48) t3 0 0 c] = [p8 0 0 0 p4 p3 0 0 p0] */"},
{"lineNum":"  209","line":"    d += (uint128_t)a1 * a4","class":"lineCov","hits":"2","order":"2420","possible_hits":"2",},
{"lineNum":"  210","line":"       + (uint128_t)(a2*2) * a3;","class":"lineCov","hits":"1","order":"2421","possible_hits":"1",},
{"lineNum":"  211","line":"    VERIFY_BITS(d, 114);"},
{"lineNum":"  212","line":"    /* [d t4+(tx<<48) t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"  213","line":"    u0 = d & M; d >>= 52;","class":"lineCov","hits":"1","order":"2422","possible_hits":"1",},
{"lineNum":"  214","line":"    VERIFY_BITS(u0, 52);"},
{"lineNum":"  215","line":"    VERIFY_BITS(d, 62);"},
{"lineNum":"  216","line":"    /* [d u0 t4+(tx<<48) t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"  217","line":"    /* [d 0 t4+(tx<<48)+(u0<<52) t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"  218","line":"    u0 = (u0 << 4) | tx;","class":"lineCov","hits":"1","order":"2423","possible_hits":"1",},
{"lineNum":"  219","line":"    VERIFY_BITS(u0, 56);"},
{"lineNum":"  220","line":"    /* [d 0 t4+(u0<<48) t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"  221","line":"    c += (uint128_t)u0 * (R >> 4);","class":"lineCov","hits":"1","order":"2424","possible_hits":"1",},
{"lineNum":"  222","line":"    VERIFY_BITS(c, 113);"},
{"lineNum":"  223","line":"    /* [d 0 t4 t3 0 0 c] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"  224","line":"    r[0] = c & M; c >>= 52;","class":"lineCov","hits":"1","order":"2425","possible_hits":"1",},
{"lineNum":"  225","line":"    VERIFY_BITS(r[0], 52);"},
{"lineNum":"  226","line":"    VERIFY_BITS(c, 61);"},
{"lineNum":"  227","line":"    /* [d 0 t4 t3 0 c r0] = [p8 0 0 p5 p4 p3 0 0 p0] */"},
{"lineNum":"  228","line":""},
{"lineNum":"  229","line":"    a0 *= 2;","class":"lineCov","hits":"1","order":"2426","possible_hits":"1",},
{"lineNum":"  230","line":"    c += (uint128_t)a0 * a1;","class":"lineCov","hits":"1","order":"2427","possible_hits":"1",},
{"lineNum":"  231","line":"    VERIFY_BITS(c, 114);"},
{"lineNum":"  232","line":"    /* [d 0 t4 t3 0 c r0] = [p8 0 0 p5 p4 p3 0 p1 p0] */"},
{"lineNum":"  233","line":"    d += (uint128_t)a2 * a4","class":"lineCov","hits":"2","order":"2428","possible_hits":"2",},
{"lineNum":"  234","line":"       + (uint128_t)a3 * a3;","class":"lineCov","hits":"1","order":"2429","possible_hits":"1",},
{"lineNum":"  235","line":"    VERIFY_BITS(d, 114);"},
{"lineNum":"  236","line":"    /* [d 0 t4 t3 0 c r0] = [p8 0 p6 p5 p4 p3 0 p1 p0] */"},
{"lineNum":"  237","line":"    c += (d & M) * R; d >>= 52;","class":"lineCov","hits":"1","order":"2430","possible_hits":"1",},
{"lineNum":"  238","line":"    VERIFY_BITS(c, 115);"},
{"lineNum":"  239","line":"    VERIFY_BITS(d, 62);"},
{"lineNum":"  240","line":"    /* [d 0 0 t4 t3 0 c r0] = [p8 0 p6 p5 p4 p3 0 p1 p0] */"},
{"lineNum":"  241","line":"    r[1] = c & M; c >>= 52;","class":"lineCov","hits":"1","order":"2431","possible_hits":"1",},
{"lineNum":"  242","line":"    VERIFY_BITS(r[1], 52);"},
{"lineNum":"  243","line":"    VERIFY_BITS(c, 63);"},
{"lineNum":"  244","line":"    /* [d 0 0 t4 t3 c r1 r0] = [p8 0 p6 p5 p4 p3 0 p1 p0] */"},
{"lineNum":"  245","line":""},
{"lineNum":"  246","line":"    c += (uint128_t)a0 * a2","class":"lineCov","hits":"2","order":"2432","possible_hits":"2",},
{"lineNum":"  247","line":"       + (uint128_t)a1 * a1;","class":"lineCov","hits":"1","order":"2433","possible_hits":"1",},
{"lineNum":"  248","line":"    VERIFY_BITS(c, 114);"},
{"lineNum":"  249","line":"    /* [d 0 0 t4 t3 c r1 r0] = [p8 0 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  250","line":"    d += (uint128_t)a3 * a4;","class":"lineCov","hits":"1","order":"2434","possible_hits":"1",},
{"lineNum":"  251","line":"    VERIFY_BITS(d, 114);"},
{"lineNum":"  252","line":"    /* [d 0 0 t4 t3 c r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  253","line":"    c += (d & M) * R; d >>= 52;","class":"lineCov","hits":"1","order":"2435","possible_hits":"1",},
{"lineNum":"  254","line":"    VERIFY_BITS(c, 115);"},
{"lineNum":"  255","line":"    VERIFY_BITS(d, 62);"},
{"lineNum":"  256","line":"    /* [d 0 0 0 t4 t3 c r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  257","line":"    r[2] = c & M; c >>= 52;","class":"lineCov","hits":"1","order":"2436","possible_hits":"1",},
{"lineNum":"  258","line":"    VERIFY_BITS(r[2], 52);"},
{"lineNum":"  259","line":"    VERIFY_BITS(c, 63);"},
{"lineNum":"  260","line":"    /* [d 0 0 0 t4 t3+c r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  261","line":""},
{"lineNum":"  262","line":"    c   += d * R + t3;","class":"lineCov","hits":"1","order":"2437","possible_hits":"1",},
{"lineNum":"  263","line":"    VERIFY_BITS(c, 100);"},
{"lineNum":"  264","line":"    /* [t4 c r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  265","line":"    r[3] = c & M; c >>= 52;","class":"lineCov","hits":"1","order":"2438","possible_hits":"1",},
{"lineNum":"  266","line":"    VERIFY_BITS(r[3], 52);"},
{"lineNum":"  267","line":"    VERIFY_BITS(c, 48);"},
{"lineNum":"  268","line":"    /* [t4+c r3 r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  269","line":"    c   += t4;","class":"lineCov","hits":"1","order":"2439","possible_hits":"1",},
{"lineNum":"  270","line":"    VERIFY_BITS(c, 49);"},
{"lineNum":"  271","line":"    /* [c r3 r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  272","line":"    r[4] = c;","class":"lineCov","hits":"1","order":"2440","possible_hits":"1",},
{"lineNum":"  273","line":"    VERIFY_BITS(r[4], 49);"},
{"lineNum":"  274","line":"    /* [r4 r3 r2 r1 r0] = [p8 p7 p6 p5 p4 p3 p2 p1 p0] */"},
{"lineNum":"  275","line":"}","class":"linePartCov","hits":"1","order":"2441","possible_hits":"2",},
{"lineNum":"  276","line":""},
{"lineNum":"  277","line":"#endif /* SECP256K1_FIELD_INNER5X52_IMPL_H */"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "lightning_invoice-19f07d0577b73f6d", "date" : "2019-06-01 07:50:27", "instrumented" : 84, "covered" : 84,};
var merged_data = [];
