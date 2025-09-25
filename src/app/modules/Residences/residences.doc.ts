/**
 * @openapi
 * /residences:
 *   post:
 *     summary: POST Residences
 *     tags:
 *       - Residences
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 * @openapi
 * /residences:
 *   get:
 *     summary: Get All Residences
 *     tags:
 *       - Residences
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter parameter
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter parameter
 *     responses:
 *       200:
 *         description: Success
 * @openapi
 * /residences/:id:
 *   get:
 *     summary: Get Single Residences
 *     tags:
 *       - Residences
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter parameter
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter parameter
 *     responses:
 *       200:
 *         description: Success
 * @openapi
 * /residences/:id:
 *   patch:
 *     summary: PATCH Residences
 *     tags:
 *       - Residences
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 * @openapi
 * /residences/:id:
 *   delete:
 *     summary: DELETE Residences
 *     tags:
 *       - Residences
 *     responses:
 *       200:
 *         description: Success
 */
