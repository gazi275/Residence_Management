/**
 * @openapi
 * components:
 *   schemas:
 *     IssueTypeInput:
 *       type: object
 *       required:
 *         - type
 *       properties:
 *         type:
 *           type: string
 *           description: The type/name of the issue
 *           example: "Plumbing"
 *         image:
 *           type: string
 *           description: Optional image URL for the issue type
 *           example: "https://example.com/plumbing-icon.png"
 *     IssueTypeUpdateInput:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: The type/name of the issue
 *           example: "Electrical"
 *         image:
 *           type: string
 *           description: Optional image URL for the issue type
 *           example: "https://example.com/electrical-icon.png"
 *     IssueTypeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f5e8b8c1234567890abcde"
 *         type:
 *           type: string
 *           example: "Plumbing"
 *         image:
 *           type: string
 *           nullable: true
 *           example: "https://example.com/plumbing-icon.png"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-09-04T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-09-04T12:00:00.000Z"
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * @openapi
 * /issuetype:
 *   post:
 *     summary: Create a new IssueType
 *     tags:
 *       - IssueType
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IssueTypeInput'
 *     responses:
 *       201:
 *         description: IssueType created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/IssueTypeResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 * 
 * @openapi
 * /issuetype:
 *   get:
 *     summary: Get All IssueTypes
 *     tags:
 *       - IssueType
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         required: false
 *         description: Number of items to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: false
 *         description: Page number
 *     responses:
 *       200:
 *         description: IssueTypes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         issueTypes:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/IssueTypeResponse'
 *                         pagination:
 *                           type: object
 *                           properties:
 *                             total:
 *                               type: integer
 *                             page:
 *                               type: integer
 *                             limit:
 *                               type: integer
 *                             totalPages:
 *                               type: integer
 * 
 * @openapi
 * /issuetype/{id}:
 *   get:
 *     summary: Get Single IssueType by ID
 *     tags:
 *       - IssueType
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: IssueType ID
 *     responses:
 *       200:
 *         description: IssueType retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/IssueTypeResponse'
 *       404:
 *         description: IssueType not found
 * 
 * @openapi
 * /issuetype/{id}:
 *   patch:
 *     summary: Update IssueType
 *     tags:
 *       - IssueType
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: IssueType ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IssueTypeUpdateInput'
 *     responses:
 *       200:
 *         description: IssueType updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/IssueTypeResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: IssueType not found
 * 
 * @openapi
 * /issuetype/{id}:
 *   delete:
 *     summary: Delete IssueType
 *     tags:
 *       - IssueType
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: IssueType ID
 *     responses:
 *       200:
 *         description: IssueType deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: IssueType not found
 */